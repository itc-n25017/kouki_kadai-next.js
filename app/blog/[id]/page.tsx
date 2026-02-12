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
  const { id } = await params; // ★ ここが重要（await）

  const blog = await getBlog(id);

  return (
    <main style={{ padding: 20 }}>
      <h1>{blog.title}</h1>

      {blog.eyecatch && (
        <img src={blog.eyecatch.url} width={400} alt={blog.title} />
      )}

      <p>クルー：{blog.crew}</p>

      <div
        dangerouslySetInnerHTML={{ __html: blog.content }}
        style={{ marginTop: 20 }}
      />
    </main>
  );
}
