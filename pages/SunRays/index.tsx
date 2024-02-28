import Head from "next/head";
import { Inter } from "next/font/google";
import styles from "@/styles/SunRays.module.css";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export default function SunRays() {
  return (
    <>
      <Head>
        <title>Sun Rays!</title>
      </Head>
      <main className={styles.main}>
        <Link href="/">
          <div className={styles.sun}>
            <div className={styles.ray_box}>
              <div className={`${styles.ray} ${styles.ray1}`}></div>
              <div className={`${styles.ray} ${styles.ray2}`}></div>
              <div className={`${styles.ray} ${styles.ray3}`}></div>
              <div className={`${styles.ray} ${styles.ray4}`}></div>
              <div className={`${styles.ray} ${styles.ray5}`}></div>
              <div className={`${styles.ray} ${styles.ray6}`}></div>
              <div className={`${styles.ray} ${styles.ray7}`}></div>
              <div className={`${styles.ray} ${styles.ray8}`}></div>
              <div className={`${styles.ray} ${styles.ray9}`}></div>
              <div className={`${styles.ray} ${styles.ray10}`}></div>
            </div>
          </div>
        </Link>
        <p className={styles.source}>
          original source : {"\n"}
          <Link
            href="https://www.sitepoint.com/community/t/css-sun-rays/365448"
            className={styles.source_link}
          >
            https://www.sitepoint.com/community/t/css-sun-rays/365448
          </Link>
        </p>
      </main>
    </>
  );
}
