import Head from "next/head";
import { useEffect, useState } from 'react'
import { supabase } from "@/lib/supabaseClient";
import styles from "@/styles/Home.module.css";
import router from "next/router";

export default function Leaderboard() {

    const [entries, setEntries] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const getTopContributors = (entries: { name: string }[]) => {
        const counts = entries.reduce((acc, entry) => {
            acc[entry.name.trim()] = (acc[entry.name.trim()] || 0) + 1;
            return acc;
        }, {} as Record<string, number>);
        return Object.entries(counts)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 3);
    };

    useEffect(() => {
        const fetchEntries = async () => {
            setLoading(true);
            setError(null);
            const { data, error } = await supabase.from("entries").select("*");
            if (error) {
                setError("Please try again later !");
            } else {
                setEntries(getTopContributors(data));
            }
            setLoading(false);
        };
        fetchEntries();
    }, []);

    return (
        <>
            <Head>
                <title>OPTEAM | Leaderboard</title>
                <meta name="description" content="OPTEAM | Leaderboard" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className={styles.page}>
                <div className={styles.main}>
                    <div className={styles.leaderboard}>
                        <h2>🏆 OPTEAM Leaderboard 🏆</h2>
                        <div className={styles.leaderboardData}>
                            {loading && <p>Loading ...</p>}
                            {error && <p>{error}</p>}
                            {!loading && !error && entries.length > 0 && (
                                <ul style={{ listStyleType: "none", padding: 0 }}>
                                    {entries.map(([name, count], i) => (
                                        <li key={name} style={{ fontSize: "18px", margin: "10px 0" }}>
                                            <strong>#{i + 1} {name}</strong> - {count} contributions
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                        <div className={styles.backContainer}>
                            <div className={styles.formSubmit} onClick={() => router.push('/')}>
                                <div className={styles.formBtn}>
                                    <div>
                                        <span>GO BACK</span>
                                        <span>GO BACK</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}
