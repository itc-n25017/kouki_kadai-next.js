import "./globals.css";
import Link from "next/link";

export const metadata = {
  title: "ONE PIECE キャラ図鑑",
  description: "麦わらの一味キャラクター一覧",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body>
        {/* ヘッダー */}
        <header className="header">
          <Link href="/" className="logo">
            🏴‍☠️ ONE PIECE 図鑑
          </Link>

          <nav>
            <Link href="/blog">キャラクター</Link>
          </nav>
        </header>

        {/* ページ本体 */}
        {children}

        {/* フッター */}
        <footer className="footer">© ONE PIECE FAN SITE</footer>
      </body>
    </html>
  );
}
