import type { Metadata } from "next";
import "./globals.css";
import "./case-study.css";
export const metadata: Metadata = { title: "Melissa Shi — Product Designer & Design Strategist", description: "Melissa Shi designs research-led AI and enterprise SaaS products that make complex work feel clear.", icons: { icon: "/portfolio/portfolio-logo.png", shortcut: "/portfolio/portfolio-logo.png" } };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="en"><body id="top">{children}</body></html>; }
