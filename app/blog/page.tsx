import Link from "next/link";
import { client } from "@/app/lib/microcms";
import { Blog } from "@/app/types/blog";

async function getBlogs(): Promise<Blog[]> {
  const data = await client.get({
    endpoint: "blog",
  });
  return data.contents;
}

export default async function BlogPage() {
  const blogs = await getBlogs();

  return (
    <main style={{ padding: 20 }}>
      <h1>🏴‍☠️ ONE PIECE キャラ図鑑</h1>

      <div style={{ display: "flex", flexWrap: "wrap", gap: 20 }}>
        {blogs.map((blog) => (
          <Link key={blog.id} href={`/blog/${blog.id}`}>
            <div
              style={{
                border: "1px solid #ccc",
                padding: 10,
                width: 200,
                borderRadius: 10,
              }}
            >
              {blog.eyecatch && (
                <img src={blog.eyecatch.url} width={180} alt={blog.title} />
              )}

              <h3>{blog.title}</h3>
              <p>{blog.crew}</p>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
