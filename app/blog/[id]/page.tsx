import { client } from "@/app/lib/microcms";
import { Blog } from "@/app/types/blog";

type Props = {
  params: {
    id: string;
  };
};

async function getBlog(id: string): Promise<Blog> {
  return await client.get({
    endpoint: "blog",
    contentId: id,
  });
}

export default async function BlogDetail({ params }: Props) {
  const blog = await getBlog(params.id);

  return (
    <main>
      <h1>{blog.title}</h1>

      {/* 画像 */}
      {blog.eyecatch && blog.eyecatch.url && (
        <img
          src={blog.eyecatch.url}
          alt={blog.title}
          width="600"
          height="400"
        />
      )}

      {/* クルー */}
      {blog.crew && <p>クルー：{blog.crew}</p>}

      {/* 懸賞金 */}
      {blog.bounty !== undefined && <p>懸賞金：{blog.bounty} B</p>}

      {/* 本文（undefined対策済み） */}
      {blog.content && (
        <div
          dangerouslySetInnerHTML={{
            __html: blog.content,
          }}
        />
      )}
    </main>
  );
}
