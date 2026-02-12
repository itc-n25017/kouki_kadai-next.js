import Link from "next/link";
import { client } from "@/app/lib/microcms";
import { Blog } from "@/app/types/blog";

async function getBlogs(): Promise<Blog[]> {
  const data = await client.get({ endpoint: "blog" });
  return data.contents;
}

export default async function BlogPage() {
  const blogs = await getBlogs();

  return (
    <main>
      <h1>🏴‍☠️ ONE PIECE キャラ図鑑</h1>

      <div className="grid">
        {blogs.map((blog) => (
          <Link key={blog.id} href={`/blog/${blog.id}`}>
            <div className="card">
              {blog.eyecatch && (
                <img src={blog.eyecatch.url} alt={blog.title} />
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
