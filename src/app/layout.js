import { Inter } from "next/font/google";
import "./globals.css";
import Gtag from "./gtag"

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Gemini pro chat",
  description: "Gemini pro chat by Nextjs",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
      <Gtag />
    </html>
  );
}
