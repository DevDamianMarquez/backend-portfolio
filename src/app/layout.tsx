import type { Metadata, Viewport } from "next";
// Fonts are self-hosted from npm, so builds never depend on reaching Google Fonts.
import "@fontsource-variable/sora";
import "@fontsource-variable/jetbrains-mono";
import "@fontsource/ibm-plex-sans/400.css";
import "@fontsource/ibm-plex-sans/500.css";
import "@fontsource/ibm-plex-sans/600.css";
import { site } from "@/config/site";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import "./globals.css";

const description = `${site.intro} Python, FastAPI, PostgreSQL and LLM integrations. Based in ${site.location}.`;

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.name} | ${site.role}`, template: `%s | ${site.name}` },
  description,
  authors: [{ name: site.name, url: site.github }],
  keywords: ["Junior Backend Engineer", "Python", "FastAPI", "PostgreSQL", "REST API", "LLM", "Uruguay", "Remote"],
  alternates: { canonical: "/" },
  openGraph: {
    title: `${site.name} | ${site.role}`,
    description,
    url: "/",
    siteName: site.name,
    type: "website",
    locale: "en_US",
  },
  twitter: { card: "summary_large_image", title: `${site.name} | ${site.role}`, description },
};

export const viewport: Viewport = { themeColor: "#0b1119", colorScheme: "dark" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-dvh antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:bg-panel focus:px-3 focus:py-2"
        >
          Skip to content
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
