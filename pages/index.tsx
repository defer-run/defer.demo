import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import styles from '../styles/Home.module.css'


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
              <h2>Test a function!</h2>
              <p>Running this Vercel function will trigger a defer function ⚡️</p>
            </div>
          </Link>

        </div>
      </main>

    </div>
  )
}

export default Home
