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

        <div className={styles.grid}>
          <Link href="/api/contacts/import">
            <div className={styles.card}>
              <h2>
                <code>defer()</code>
              </h2>
              <p>Run a single import contact in the background</p>
            </div>
          </Link>

          <Link href="/api/contacts/import-parallel-with-result">
            <div className={styles.card}>
              <h2>
                <code>defer.await()</code>
              </h2>
              <p>
                Process multiple import contacts in the background and get the
                final results
              </p>
            </div>
          </Link>

          <Link href="/api/contacts/import-parallel-with-result">
            <div className={styles.card}>
              <h2>
                <code>defer.delayed()</code>
              </h2>
              <p>Schedule the import contacts in 1 day</p>
            </div>
          </Link>
        </div>
      </main>
    </div>
  );
};

export default Home;
