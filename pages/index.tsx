import Head from "next/head";
import styles from "@/styles/Home.module.css";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Head>
        <title>Styling Toys</title>
      </Head>
      <main className={styles.main}>
        <h1>HomePage!</h1>
        <ul>
          <li>
            <Link href="/SunRays" className={styles.link}>
              to Sun Rays
            </Link>
          </li>
          <li>
            <Link href="/WebRTC" className={styles.link}>
              to WebRTC
            </Link>
          </li>
          <li>to be continue...</li>
        </ul>
      </main>
    </>
  );
}
