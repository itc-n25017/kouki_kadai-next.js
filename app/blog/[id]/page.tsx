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
    <main className="detail">
      {/* 左：画像 */}
      <div className="detail-image">
        {blog.eyecatch && <img src={blog.eyecatch.url} alt={blog.title} />}
      </div>

      {/* 右：説明 */}
      <div className="detail-info">
        <h1>{blog.title}</h1>

        <p className="crew">所属：{blog.crew}</p>

        {blog.bounty && <p className="bounty">懸賞金：{blog.bounty} ベリー</p>}

        <div
          className="content"
          dangerouslySetInnerHTML={{ __html: blog.content }}
        />
      </div>
    </main>
  );
}
