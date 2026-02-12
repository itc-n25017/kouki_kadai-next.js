import Link from "next/link";

export default function Home() {
  return (
    <main style={{ textAlign: "center", marginTop: "60px" }}>
      <h1>one piece</h1>

      <p style={{ marginTop: "20px" }}>ワンピースキャラ紹介</p>

      <Link
        href="/blog"
        style={{
          display: "inline-block",
          marginTop: "30px",
          padding: "10px 20px",
          background: "#333",
          color: "#fff",
          textDecoration: "none",
          borderRadius: "6px",
        }}
      >
        記事一覧を見る
      </Link>
    </main>
  );
}
