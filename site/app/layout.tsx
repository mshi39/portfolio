import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import "./case-study.css";
export const metadata: Metadata = { title: "Melissa Shi — Product Designer & Design Strategist", description: "Melissa Shi designs research-led AI and enterprise SaaS products that make complex work feel clear.", icons: { icon: "/portfolio/portfolio-logo.png", shortcut: "/portfolio/portfolio-logo.png" } };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="en"><body id="top">{children}<Script id="portfolio-ai-chat-widget" src="https://portfolio-ai-chat-melissa.vercel.app/widget.js?v=2" data-api-base="https://portfolio-ai-chat-melissa.vercel.app" strategy="afterInteractive" /></body></html>; }
