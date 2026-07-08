"use client";

import { useState } from "react";
import styles from "./page.module.scss";

async function callHandler(path: "greet" | "goodbye", name: string): Promise<string> {
  const response = await fetch(`/api/${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name }),
  });

  if (!response.ok) {
    throw new Error("リクエストに失敗しました。");
  }

  return response.text();
}

export default function Home() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAction = async (path: "greet" | "goodbye") => {
    setError("");
    setMessage("");

    if (!name.trim()) {
      setError("名前を入力してください。");
      return;
    }

    setLoading(true);

    try {
      const result = await callHandler(path, name.trim());
      setMessage(result);
    } catch {
      setError("エラーが発生しました。");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className={styles.container}>
      <h1>Welcome Site</h1>
      <p>名前を入力して、挨拶またはお別れのメッセージを表示できます。</p>

      <div className={styles.form}>
        <label htmlFor="name">名前</label>
        <input
          id="name"
          type="text"
          placeholder="Taro"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />

        <div className={styles.actions}>
          <button
            type="button"
            className={styles.primaryButton}
            onClick={() => handleAction("greet")}
            disabled={loading}
          >
            Greet
          </button>
          <button
            type="button"
            className={styles.secondaryButton}
            onClick={() => handleAction("goodbye")}
            disabled={loading}
          >
            Goodbye
          </button>
        </div>
      </div>

      {loading && <p className={styles.status}>送信中...</p>}
      {error && <p className={styles.error}>{error}</p>}
      {message && <p className={styles.message}>{message}</p>}
    </main>
  );
}
