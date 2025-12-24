import type { Metadata } from "next";
import { Tajawal } from "next/font/google";
import "./globals.css";

const tajawal = Tajawal({
  subsets: ["arabic"],
  weight: ["400", "500", "700"],
  variable: "--font-tajawal",
  display: "swap"
});

export const metadata: Metadata = {
  title: "بوت تداول ذكي | Agentic AI Trader",
  description:
    "منصة تداول تعتمد على الذكاء الاصطناعي لتوليد استراتيجيات ذكية، وإدارة المخاطر، وتحليل السوق بذكاء استثنائي.",
  keywords: ["تداول", "ذكاء اصطناعي", "بوت", "استثمار", "تحليل السوق"],
  openGraph: {
    title: "بوت تداول ذكي",
    description:
      "اكتشف قوة الذكاء الاصطناعي في التداول مع توقعات دقيقة، إدارة مخاطر، ولوحة تحكم شاملة.",
    url: "https://agentic-39e6881a.vercel.app",
    siteName: "Agentic AI Trader",
    locale: "ar_AR",
    type: "website"
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl" className={tajawal.variable}>
      <body className="gradient-bg">{children}</body>
    </html>
  );
}
