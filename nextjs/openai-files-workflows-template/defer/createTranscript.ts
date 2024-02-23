import { defer } from "@defer/client";
import OpenAI, { toFile } from "openai";

export async function createTranscript(
  data: string,
  _index: number,
  _meetingID: string
) {
  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

  const results = await openai.audio.transcriptions.create({
    file: await toFile(
      Buffer.from(data.split(";base64,").pop()!, "base64"),
      "chunk.mp3"
    ),
    model: "whisper-1",
  });

  console.log("results", results);

  // TODO: save transcript to database using `_index` and `_meetingID`
}

export default defer(createTranscript, { concurrency: 1, retry: 2 });
