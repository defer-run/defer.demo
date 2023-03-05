import { FetchExecutionResponse } from "@defer/client";
import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useCallback, useRef, useState } from "react";
import styles from "../styles/Home.module.css";

interface LongRunningResponse {
  res: FetchExecutionResponse;
}

const Home: NextPage = () => {
  const [pendingExecStatus, setPendingExecStatus] = useState<string>();
  const intervalRef = useRef<number | null>();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const pollExecution = (pendingExecId: string) => async () => {
    const res = await fetch(`/api/longRunning/${pendingExecId}`, {
      method: "POST",
    });
    const data = (await res.json()) as Promise<LongRunningResponse>;
    setPendingExecStatus((await data).res.state);
    if (
      ["succeed", "failed"].includes((await data).res.state) &&
      intervalRef.current
    ) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const triggerExecution = useCallback(async () => {
    const res = await fetch(`/api/longRunning/trigger`, { method: "POST" });
    const data = await res.json();
    intervalRef.current = setInterval(
      pollExecution(data.id),
      500
    ) as unknown as number;
  }, [pollExecution]);

  return (
    <div className={styles.container}>
      <Head>
        <title>defer.run demo</title>
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          <a href="https://defer.run">Defer</a> demo
        </h1>

        <h2 className={styles.h2}>
          <code>importContacts()</code> function
        </h2>
        <div className={styles.grid}>
          <Link href="/api/contacts/succeed">
            <div className={styles.card}>
              <h3>
                <code>defer()</code>
              </h3>
              <p>Run a single import contact in the background</p>
            </div>
          </Link>

          <Link href="/api/contacts/failed">
            <div className={styles.card}>
              <h3 style={{ color: "red" }}>
                <code>defer()</code>
              </h3>
              <p style={{ color: "red" }}>
                Run a single import contact that will fail in the background
              </p>
            </div>
          </Link>

          <Link href="/api/contacts/started">
            <div className={styles.card}>
              <h3 style={{ color: "orange" }}>
                <code>defer()</code>
              </h3>
              <p style={{ color: "orange" }}>
                Run a single import contact that will stay running in the
                background
              </p>
            </div>
          </Link>

          <Link href="/api/contacts/parallel-with-result">
            <div className={styles.card}>
              <h3>
                <code>waitResult(deferFn)</code>
              </h3>
              <p>
                Process multiple import contacts in the background and get the
                final results
              </p>
            </div>
          </Link>

          <Link href="/api/contacts/delayed">
            <div className={styles.card}>
              <h3>
                <code>defer.delayed()</code>
              </h3>
              <p>Schedule the import contacts in 1 day</p>
            </div>
          </Link>

          <div onClick={triggerExecution}>
            <div className={styles.card}>
              <h3>
                <code>getExecution()</code>
              </h3>
              <p>
                {pendingExecStatus
                  ? `Status: ${pendingExecStatus}`
                  : "Schedule the import and poll for status"}
              </p>
            </div>
          </div>
        </div>

        <h2 className={styles.h2}>
          <code>sendEmails()</code> function
        </h2>
        <div className={styles.grid}>
          <Link href="/api/emails/succeed">
            <div className={styles.card}>
              <h3>
                <code>defer()</code>
              </h3>
              <p>Send a single email in the background</p>
            </div>
          </Link>

          <Link href="/api/emails/failed">
            <div className={styles.card}>
              <h3 style={{ color: "red" }}>
                <code>defer()</code>
              </h3>
              <p style={{ color: "red" }}>
                Send a single email that will fail in the background
              </p>
            </div>
          </Link>

          <Link href="/api/emails/started">
            <div className={styles.card}>
              <h3 style={{ color: "orange" }}>
                <code>defer()</code>
              </h3>
              <p style={{ color: "orange" }}>
                Send a single email that will stay running in the background
              </p>
            </div>
          </Link>

          <Link href="/api/emails/parallel-with-result">
            <div className={styles.card}>
              <h3>
                <code>defer.await()</code>
              </h3>
              <p>
                Send multiple emails in the background and get the final results
              </p>
            </div>
          </Link>

          <Link href="/api/emails/delayed">
            <div className={styles.card}>
              <h3>
                <code>defer.delayed()</code>
              </h3>
              <p>Schedule the email sending in 1 day</p>
            </div>
          </Link>
        </div>
      </main>
    </div>
  );
};

export default Home;
