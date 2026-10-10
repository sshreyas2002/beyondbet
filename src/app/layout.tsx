import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = {
  title: "BeyondBet — All the game. None of the stakes.",
  description:
    "A free-to-play social sports prediction prototype. Fictional credits. Real community.",
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
