import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import styles from '../styles/Home.module.css'


const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>cua.run demo</title>
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          <a href="https://cua.run">cua</a> demo
        </h1>


        <div className={styles.grid}>
          <Link href="/api/cuaFunction">
            <div className={styles.card}>
              <h2>Test a function!</h2>
              <p>Running this Vercel function will trigger a cua function ⚡️</p>
            </div>
          </Link>

        </div>
      </main>

    </div>
  )
}

export default Home
