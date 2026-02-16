import { client } from "@/app/lib/microcms";
import { Blog } from "@/app/types/blog";
import Search from "./search";

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
  return <Search blogs={blogs} />;
}
