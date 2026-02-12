import { client } from "@/app/lib/microcms";
import { Blog } from "@/app/types/blog";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

async function getBlog(id: string): Promise<Blog> {
  return await client.get({
    endpoint: "blog",
    contentId: id,
  });
}

export default async function BlogDetail({ params }: Props) {
  const { id } = await params;
  const blog = await getBlog(id);

  return (
    <main style={{ padding: "40px" }}>
      <div
        style={{
          display: "flex",
          gap: "40px",
          alignItems: "flex-start",
        }}
      >
        {/* 左：画像 */}
        {blog.eyecatch?.url && (
          <img
            src={blog.eyecatch.url}
            alt={blog.title}
            width="500"
            style={{ borderRadius: "10px" }}
          />
        )}

        {/* 右：テキスト */}
        <div>
          <h1 style={{ marginBottom: "20px" }}>{blog.title}</h1>

          {blog.crew && <p>クルー：{blog.crew}</p>}

          {blog.bounty !== undefined && <p>懸賞金：{blog.bounty} B</p>}

          {blog.content && (
            <div
              style={{ marginTop: "20px" }}
              dangerouslySetInnerHTML={{
                __html: blog.content,
              }}
            />
          )}
        </div>
      </div>
    </main>
  );
}
