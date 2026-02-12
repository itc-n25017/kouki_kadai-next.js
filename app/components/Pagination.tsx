import Link from "next/link";

type Props = {
  total: number;
  current: number;
  perPage: number;
};

export default function Pagination({ total, current, perPage }: Props) {
  const pages = Math.ceil(total / perPage);

  return (
    <div style={{ textAlign: "center", marginTop: "30px" }}>
      {Array.from({ length: pages }, (_, i) => i + 1).map((p) => (
        <Link
          key={p}
          href={`/blog?page=${p}`}
          style={{
            margin: "0 5px",
            padding: "6px 12px",
            border: "1px solid #ccc",
            background: p === current ? "#333" : "#fff",
            color: p === current ? "#fff" : "#000",
          }}
        >
          {p}
        </Link>
      ))}
    </div>
  );
}
