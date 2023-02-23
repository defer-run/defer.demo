import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>defer.run demo</title>
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          <a href="https://defer.run">Defer</a> demo
        </h1>

        <h2 className={styles.h2}><code>importContacts()</code> function</h2>
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
              <h3 style={{color: 'red'}}>
                <code>defer()</code>
              </h3>
              <p style={{color: 'red'}}>Run a single import contact that will fail in the background</p>
            </div>
          </Link>

          <Link href="/api/contacts/started">
            <div className={styles.card}>
              <h3 style={{color: 'orange'}}>
                <code>defer()</code>
              </h3>
              <p style={{color: 'orange'}}>Run a single import contact that will stay running in the background</p>
            </div>
          </Link>

          <Link href="/api/contacts/parallel-with-result">
            <div className={styles.card}>
              <h3>
                <code>defer.await()</code>
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
        </div>

        <h2 className={styles.h2}><code>sendEmails()</code> function</h2>
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
              <h3 style={{color: 'red'}}>
                <code>defer()</code>
              </h3>
              <p style={{color: 'red'}}>Send a single email that will fail in the background</p>
            </div>
          </Link>

          <Link href="/api/emails/started">
            <div className={styles.card}>
              <h3 style={{color: 'orange'}}>
                <code>defer()</code>
              </h3>
              <p style={{color: 'orange'}}>Send a single email that will stay running in the background</p>
            </div>
          </Link>

          <Link href="/api/emails/parallel-with-result">
            <div className={styles.card}>
              <h3>
                <code>defer.await()</code>
              </h3>
              <p>
                Send multiple emails in the background and get the
                final results
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
