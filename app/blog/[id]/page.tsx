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
  params: { id: string };
}) {
  const blog = await getBlog(params.id);

  return (
    <main style={{ padding: 20 }}>
      <h1>{blog.title}</h1>

      {blog.eyecatch && <img src={blog.eyecatch.url} width={400} />}

      <p>
        <b>所属：</b>
        {blog.crew}
      </p>
      <p>
        <b>懸賞金：</b>
        {blog.bounty}
      </p>

      <div dangerouslySetInnerHTML={{ __html: blog.content }} />
    </main>
  );
}
