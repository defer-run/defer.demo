import { createWriteStream, existsSync } from "node:fs";
import { Readable, finished } from "node:stream";

import { defer } from "@defer/client";
import ffmpeg from "fluent-ffmpeg";

import createTranscript from "./createTranscript";

const CHUNK_SIZE_IN_MIN = 6;

async function fetchVideoToDisk() {
  const stream = createWriteStream("meeting-video.mp4");
  const { body } = await fetch(
    "https://github.com/defer-run/defer.demo/raw/master/nextjs/openai-files-workflows-template/meeting-video.mp4"
  );
  return finished(Readable.fromWeb(body as any).pipe(stream), console.error);
}

// This background functions downloads the meeting video file,
//  chunk it in 3 min videos (~8-12MB) and forward them to another
//  background functions for transcripting with OpenAI Whisper
export async function createAudioChunks(meetingID: string) {
  async function processChunkTranscript(chunkIdx: number) {
    console.log(`chunk created: out00${chunkIdx}.mp3`);
    // 3. forward the chunk file to a child execution
    const file = Bun.file(`out00${chunkIdx}.mp3`);
    await createTranscript(
      // ensure that the audio file is properly serializable
      //  see: https://www.defer.run/docs/guides/work-with-files#first-approach-encode-lightweight-files-with-base64
      Buffer.from(await file.arrayBuffer()).toString("base64"),
      chunkIdx,
      meetingID
    );
  }

  console.log("downloading meeting video file...");
  // 1. download a demo video as a video meeting source
  await fetchVideoToDisk();

  let chunk = 0;
  let remaining = true;

  // 2. Split the meeting video into chunks for OpenAI Whisper API
  return new Promise<void>((resolve, reject) => {
    console.log(
      "splitting the meeting video file into small audio chunk files..."
    );
    ffmpeg("meeting-video.mp4") // we use a local test video
      .addOutputOptions("-f segment")
      .addOutputOptions(`-segment_time 0${CHUNK_SIZE_IN_MIN}:00`)
      .addOutputOptions("-reset_timestamps 1")
      .output("out%03d.mp3")
      .on("progress", async function (info: any) {
        console.log("progress", info);
        if (info.percent < 0) {
          return;
        }
        // we hack a bit around the `info.timemark` to detect available chunks
        //  and start the OpenAI transcript in parallel
        remaining = true;
        const newChunk = Math.floor(
          parseInt(info.timemark.substr(3, 2), 10) / CHUNK_SIZE_IN_MIN
        );
        if (newChunk != chunk) {
          // let's ensure the file is written on disk before reading it
          while (!existsSync(`out00${chunk}.mp3`)) {}
          await processChunkTranscript(chunk);
          chunk++;
          remaining = false;
        }
      })
      .on("end", async function () {
        if (remaining) {
          await processChunkTranscript(chunk);
        }
        resolve();
      })
      .on("error", async function (e: any) {
        reject(e);
      })
      .run();
  });
}

export default defer(createAudioChunks, { concurrency: 10, retry: 2 });
