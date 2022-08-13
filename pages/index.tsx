import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
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
          <a href="/api/cuaFunction" className={styles.card}>
            <h2>Test a function!</h2>
            <p>Running this Vercel function will trigger a cua function ⚡️</p>
          </a>

        </div>
      </main>

    </div>
  )
}

export default Home
