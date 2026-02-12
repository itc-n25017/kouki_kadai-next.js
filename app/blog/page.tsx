import Link from "next/link";
import { client } from "@/app/lib/microcms";
import { Blog } from "@/app/types/blog";

async function getBlogs(): Promise<Blog[]> {
  const data = await client.get({
    endpoint: "blog",
    queries: { orders: "order" }, // 並び順フィールド使用（無ければ消してOK）
  });
  return data.contents;
}

export default async function BlogPage() {
  const blogs = await getBlogs();

  return (
    <main className="dex">
      <h1>🏴‍☠️ ONE PIECE キャラ図鑑</h1>

      <div className="dex-grid">
        {blogs.map((blog) => (
          <Link key={blog.id} href={`/blog/${blog.id}`}>
            <div className="dex-card">
              {/* 懸賞金 */}
              {blog.bounty && (
                <div className="bounty-badge">{blog.bounty} B</div>
              )}

              {/* 画像 */}
              {blog.eyecatch && (
                <img src={blog.eyecatch.url} alt={blog.title} />
              )}

              {/* 名前 */}
              <h3>{blog.title}</h3>

              {/* クルー */}
              <p>{blog.crew}</p>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
