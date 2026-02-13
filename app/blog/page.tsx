import Link from "next/link";
import { client } from "@/app/lib/microcms";
import { Blog } from "@/app/types/blog";

async function getBlogs(): Promise<Blog[]> {
  let allBlogs: Blog[] = [];
  let offset = 0;
  const limit = 100;

  while (true) {
    const data = await client.get({
      endpoint: "blog",
      queries: { limit, offset },
    });

    allBlogs = [...allBlogs, ...data.contents];

    if (data.contents.length < limit) break;
    offset += limit;
  }

  return allBlogs;
}

export default async function BlogPage() {
  const blogs = await getBlogs();

  // ===== 海賊団ごとにグループ化 =====
  const grouped = blogs.reduce((acc: Record<string, Blog[]>, blog) => {
    const crew = blog.crew || "その他";
    if (!acc[crew]) acc[crew] = [];
    acc[crew].push(blog);
    return acc;
  }, {});

  // ===== 表示順（自由に変更OK）=====
  const crewOrder = [
    "麦わらの一味",
    "ハートの海賊団",
    "キッド海賊団",
    "黒ひげ海賊団",
  ];

  // ===== 指定順 + それ以外も全部表示 =====
  const sortedCrews = [
    ...crewOrder.filter((crew) => grouped[crew]),
    ...Object.keys(grouped).filter((crew) => !crewOrder.includes(crew)),
  ];

  return (
    <main className="dex">
      <h1>🏴‍☠️ ONE PIECE キャラ図鑑</h1>

      {sortedCrews.map((crew) => (
        <section key={crew} style={{ marginBottom: 40 }}>
          <h2 style={{ borderBottom: "2px solid #ccc", paddingBottom: 5 }}>
            {crew}
          </h2>

          <div className="dex-grid">
            {grouped[crew].map((blog) => (
              <Link key={blog.id} href={`/blog/${blog.id}`}>
                <div className="dex-card">
                  {blog.eyecatch && (
                    <img src={blog.eyecatch.url} alt={blog.title} />
                  )}
                  <h3>{blog.title}</h3>
                </div>
              </Link>
            ))}
          </div>
        </section>
      ))}
    </main>
  );
}
