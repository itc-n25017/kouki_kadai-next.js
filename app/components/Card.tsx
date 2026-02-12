import { Blog } from "@/app/types/blog";
import Image from "next/image";
import Link from "next/link";

type Props = {
  blog: Blog;
};

export default function Card({ blog }: Props) {
  return (
    <Link href={`/blog/${blog.id}`} className="card">
      <Image
        src={blog.image?.url}
        alt={blog.title}
        width={400}
        height={250}
        style={{ objectFit: "cover" }}
      />
      <div className="card-body">
        <h3>{blog.title}</h3>
      </div>
    </Link>
  );
}
