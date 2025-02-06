import Head from "next/head";
import { Geist } from "next/font/google";
import styles from "@/styles/Home.module.css";
import { useState } from "react";
import Confetti from 'react-confetti'
import { useWindowSize } from "react-use";
import router from "next/router";
import { supabase } from "@/lib/supabaseClient";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export default function Home() {

  const { width, height } = useWindowSize()
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [done, setDone] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {

    e.preventDefault();

    if (!name || !description) {
      return;
    }

    const { error } = await supabase.from('entries').insert([{ name, description }]);

    if (error) {
      alert('Failed to submit, try again!');
    } else {
      setDone(true);
    }

    setName('');
    setDescription('');

  };

  return (
    <>
      <Head>
        <title>OPTEAM | Team Hustle: Track, Win, Repeat!</title>
        <meta name="description" content="OPTEAM | Team Hustle: Track, Win, Repeat!" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div
        className={`${styles.page} ${geistSans.variable}`}
      >
        <main className={styles.main}>
          {
            !done ?
              <div className={styles.form}>
                <img className={styles.formImg} src="/opteam_logo.png" alt="logo" />
                <div className={styles.formTitle}>
                  Another chance to be awesome! 🎉
                  <br />Write your name and tell us what you did ..
                  <br />Work, workout, or just survive like a champ and BOOM ..
                  <br />You’re part of the team’s epic progress. No capes needed. 🚀
                </div>
                <form onSubmit={handleSubmit}>
                  <div className={styles.formLabel}>
                    My name is : *
                  </div>
                  <input
                    type='text'
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  <div className={styles.formLabel}>
                    I did : *
                  </div>
                  <input
                    type='text'
                    required
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                  <div className={styles.formBtnContainer}>
                    <button className={styles.formSubmit}>
                      <div className={styles.formBtn}>
                        <div>
                          <span>SUBMIT</span>
                          <span>SUBMIT</span>
                        </div>
                      </div>
                    </button>
                  </div>
                </form>
              </div>
              :
              <div className={styles.formSuccess}>
                <img src="https://cataas.com/cat/gif" alt="logo" />
                <div className={styles.formSuccessTitle}>
                  <span>Thank you !</span>
                  <br /> Don’t worry, we won’t tell anyone it took you this long. 😉
                </div>
                <div className={styles.formSubmit} onClick={router.reload}>
                  <div className={styles.formBtn}>
                    <div>
                      <span>GO BACK</span>
                      <span>GO BACK</span>
                    </div>
                  </div>
                </div>
                <Confetti
                  width={width}
                  height={height}
                  tweenDuration={5000}
                />
              </div>
          }
        </main>
      </div>
    </>
  );
}
