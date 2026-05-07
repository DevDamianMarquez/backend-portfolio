import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Damian Marquez — Python Backend Developer",
  description: "I ship production APIs that handle auth, payments, and scale. FastAPI · Docker · Stripe · GMT-3. Available for async remote work now.",
  keywords: ["Python Backend Developer", "FastAPI", "Docker", "Stripe", "Remote", "API"],
  authors: [{ name: "Damian Marquez" }],
  openGraph: {
    title: "Damian Marquez — Python Backend Developer",
    description: "Production APIs. Auth, payments, scale. Async-first.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
