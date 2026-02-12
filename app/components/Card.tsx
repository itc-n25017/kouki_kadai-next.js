import Link from "next/link";
import Image from "next/image";
import { Blog } from "@/app/types/blog";

type Props = {
  blog: Blog;
};

export default function Card({ blog }: Props) {
  return (
    <Link href={`/blog/${blog.id}`} className="card">
      <div>
        {/* 画像 */}
        {blog.eyecatch && blog.eyecatch.url && (
          <Image
            src={blog.eyecatch.url}
            alt={blog.title}
            width={400}
            height={250}
          />
        )}

        {/* タイトル */}
        <h2>{blog.title}</h2>

        {/* クルー */}
        {blog.crew && <p>{blog.crew}</p>}

        {/* 懸賞金 */}
        {blog.bounty !== undefined && <p>{blog.bounty} B</p>}
      </div>
    </Link>
  );
}
