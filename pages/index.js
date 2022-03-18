import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";

import CarForm from "../lib/CarForm";
import SearchCars from "../lib/SearchCars";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>CAR App</title>
        <meta
          name="description"
          content="Search and create your favourite cars using RedisDB"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h4 className={styles.title}>Car App</h4>
        <span>(Add your Favourite Cars to Database)</span>
        <CarForm />
      </main>
      <hr />
      <main className={styles.main}>
        <h3 className={styles.title}>Search CARS</h3>
        <span>
          (Search your Favourite Cars from the Database and then Cache)
        </span>
        <SearchCars />
      </main>

      <footer className={styles.footer}>
        <center>
          Developed using <br /> NextJS and RedisDB <br /> by Sudhi.
        </center>
      </footer>
    </div>
  );
}
