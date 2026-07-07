"use client";

import { useState, useEffect } from "react";
import styles from "./page.module.scss";

 type AddressResult = {
  zipcode: string;
  address1: string;
  address2: string;
  address3: string;
  kana1: string;
  kana2: string;
  kana3: string;
};

export default function Home() {
  const [zipcode, setZipcode] = useState("");
 

const [results, setResults] = useState<AddressResult[]>([]);
const [histories, setHistories] = useState<AddressResult[]>([]);
  const [error, setError] = useState("");
const [loading, setLoading] = useState(false);
useEffect(() => {
  const savedHistories =
    localStorage.getItem("histories");

  if (savedHistories) {
    setHistories(JSON.parse(savedHistories));
  }
}, []);

useEffect(() => {
  localStorage.setItem(
    "histories",
    JSON.stringify(histories)
  );
}, [histories]);

const clearHistory = () => {
  setHistories([]);
};

  const handleSearch = async () => {
    setError("");
setLoading(true);

const charPattern = /^[0-9-]+$/;

if (!charPattern.test(zipcode)) {
  setError(
    "郵便番号は半角数字のみまたは半角数字とハイフンのみで入力してください。"
  );
  setLoading(false);
  return;
}

const formatPattern = /^\d{7}$|^\d{3}-\d{4}$/;

if (!formatPattern.test(zipcode)) {
  setError(
    "郵便番号は半角数字でハイフンありの8桁かハイフンなしの7桁で入力してください。"
  );
  setLoading(false);
  return;
}

try {
    const response = await fetch(
      `https://zipcloud.ibsnet.co.jp/api/search?zipcode=${zipcode.replace("-", "")}`
    );

  const data = await response.json();

if (!data.results) {
  setError("郵便番号が存在しません。");
  setResults([]);
  return;
}

setResults(data.results);

const address = data.results[0];

setHistories((prev) => [
  address,
  ...prev.filter(
    (item) => item.zipcode !== address.zipcode
  ),
  ].slice(0, 9));

  } catch {
    setError("エラーが発生しました。");
    setResults([]);
  } finally {
    setLoading(false);
  }
};

  return (
    <main className={styles.container}>
      <h1>住所検索</h1>

      <p>
        郵便番号を入力して住所を検索してください。
      </p>

      <div className={styles.searchArea}>

        <input
          type="text"
          maxLength={8}
          placeholder="100-0001"
          value={zipcode}
          onChange={(e) => setZipcode(e.target.value)}
  onKeyDown={(e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  }}
/>

 <button
  className={styles.searchButton}
  onClick={handleSearch}
  disabled={loading || zipcode === ""}
>

  検索
</button>
        {loading && (
  <p>検索中...</p>
)}
      </div>
      {error && (
  <p className={styles.error}>

    {error}
  </p>
)}
      {results.length > 0 && (
  <div className={styles.result}>
    <h2>検索結果</h2>

   {results.map((item, index) => (
  <div key={`${item.zipcode}-${index}`}>

        <p>
          住所:
          {item.address1}
          {item.address2}
          {item.address3}
        </p>

        <p>
          カナ:
          {item.kana1}
          {item.kana2}
          {item.kana3}
        </p>

        <hr />
      </div>
    ))}
  </div>
)}

{histories.length > 0 && (
  <div className={styles.history}>
    <h2>検索履歴</h2>

<button onClick={clearHistory}>
  履歴を削除
</button>

    {histories.map((item) => (
      <div
        key={item.zipcode}
        className={styles.historyCard}
         onClick={() => setResults([item])}
      >
        <p>{item.zipcode}</p>

        <p>
          {item.address1}
          {item.address2}
          {item.address3}
        </p>
      </div>
    ))}
  </div>
)}
    </main>
  );
}