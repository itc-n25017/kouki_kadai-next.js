import { client } from "@/app/lib/microcms";
import { Blog } from "@/app/types/blog";

async function getBlog(id: string): Promise<Blog> {
  const data = await client.get({
    endpoint: "blog",
    contentId: id,
  });
  return data;
}

export default async function BlogDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const blog = await getBlog(id);

  return (
    <main style={{ padding: 20, maxWidth: 800, margin: "auto" }}>
      <h1>{blog.title}</h1>

      {blog.eyecatch && (
        <img
          src={blog.eyecatch.url}
          alt={blog.title}
          style={{
            width: "100%",
            borderRadius: 12,
            boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
          }}
        />
      )}

      <p style={{ color: "#e63946", fontWeight: "bold" }}>
        クルー：{blog.crew}
      </p>

      <div
        dangerouslySetInnerHTML={{ __html: blog.content }}
        style={{ marginTop: 20, lineHeight: 1.7 }}
      />
    </main>
  );
}
