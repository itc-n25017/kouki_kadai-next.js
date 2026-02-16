"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Blog } from "@/app/types/blog";

export default function Search({ blogs }: { blogs: Blog[] }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  // URLから選択中の海賊団を取得
  const selectedCrew = searchParams.get("crew") || "all";

  const [keyword, setKeyword] = useState("");

  // =========================
  // キーワード検索
  // =========================
  const filtered = useMemo(() => {
    return blogs.filter((blog) =>
      blog.title.toLowerCase().includes(keyword.toLowerCase()),
    );
  }, [blogs, keyword]);

  // =========================
  // 海賊団ごとにグループ化 + 並び順
  // =========================
  const grouped = useMemo(() => {
    const g: Record<string, Blog[]> = {};

    filtered.forEach((blog) => {
      const crew = blog.crew || "その他";
      if (!g[crew]) g[crew] = [];
      g[crew].push(blog);
    });

    Object.keys(g).forEach((crew) => {
      g[crew].sort((a, b) => Number(a.suuji ?? 9999) - Number(b.suuji ?? 9999));
    });

    return g;
  }, [filtered]);

  // 表示順
  const crewOrder = [
    "麦わらの一味",
    "ハートの海賊団",
    "キッド海賊団",
    "黒ひげ海賊団",
    "赤髪海賊団",
    "九蛇海賊団",
    "百獣海賊団",
    "ロジャー海賊団",
    "白ひげ海賊団",
    "ドンキホーテ海賊団",
  ];

  const sortedCrews = [
    ...crewOrder.filter((crew) => grouped[crew]),
    ...Object.keys(grouped).filter((crew) => !crewOrder.includes(crew)),
  ];

  // =========================
  // 海賊団変更
  // =========================
  const changeCrew = (crew: string) => {
    if (crew === "all") {
      router.push("/blog");
    } else {
      router.push(`/blog?crew=${encodeURIComponent(crew)}`);
    }
  };

  return (
    <main className="dex">
      <h1>🏴‍☠️ ONE PIECE キャラ図鑑</h1>

      {/* 検索 */}
      <input
        type="text"
        placeholder="キャラ名で検索..."
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        style={{
          padding: "10px",
          width: "300px",
          marginBottom: "20px",
          fontSize: "16px",
        }}
      />

      {/* 海賊団ボタン */}
      <div
        style={{
          display: "flex",
          gap: "10px",
          overflowX: "auto",
          marginBottom: "30px",
        }}
      >
        <button
          onClick={() => changeCrew("all")}
          style={{
            padding: "8px 14px",
            borderRadius: "20px",
            background: selectedCrew === "all" ? "#ffcc00" : "#eee",
            fontWeight: selectedCrew === "all" ? "bold" : "normal",
          }}
        >
          全部
        </button>

        {crewOrder.map((crew) => (
          <button
            key={crew}
            onClick={() => changeCrew(crew)}
            style={{
              padding: "8px 14px",
              borderRadius: "20px",
              background: selectedCrew === crew ? "#ffcc00" : "#eee",
              fontWeight: selectedCrew === crew ? "bold" : "normal",
              whiteSpace: "nowrap",
            }}
          >
            {crew}
          </button>
        ))}
      </div>

      {/* 一覧 */}
      {sortedCrews
        .filter((crew) => selectedCrew === "all" || crew === selectedCrew)
        .map((crew) => (
          <section key={crew} className="scroll-section">
            <h2 style={{ borderBottom: "2px solid #ccc" }}>{crew}</h2>

            <div className="dex-grid">
              {grouped[crew].map((blog) => (
                <Link key={blog.id} href={`/blog/${blog.id}`}>
                  <div
                    style={{
                      borderRadius: "16px",
                      overflow: "hidden",
                      background: "#fff",
                      boxShadow: "0 6px 18px rgba(0,0,0,0.1)",
                      transition: "transform 0.2s ease, box-shadow 0.2s ease",
                      cursor: "pointer",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "translateY(-6px)";
                      e.currentTarget.style.boxShadow =
                        "0 10px 25px rgba(0,0,0,0.15)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "translateY(0)";
                      e.currentTarget.style.boxShadow =
                        "0 6px 18px rgba(0,0,0,0.1)";
                    }}
                  >
                    {/* 画像 */}
                    {blog.eyecatch && (
                      <img
                        src={blog.eyecatch.url}
                        alt={blog.title}
                        style={{
                          width: "100%",
                          height: "220px",
                          objectFit: "cover",
                        }}
                      />
                    )}

                    {/* タイトル */}
                    <div style={{ padding: "12px" }}>
                      <h3 style={{ fontSize: "16px" }}>{blog.title}</h3>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        ))}
    </main>
  );
}
