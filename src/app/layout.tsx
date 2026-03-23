import type { Metadata } from "next";
import { Inter, Nunito } from "next/font/google";
import "./globals.css";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { StickyCTA } from "@/components/layout/StickyCTA";

const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-nunito",
  weight: ["600", "700", "800"]
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500", "600", "700"]
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.anicare.es"),
  title: {
    default: "Anicare | Guardería y adopción en Telde",
    template: "%s | Anicare"
  },
  description: "Guardería para mascotas y adopción responsable en Salinetas, Telde, Gran Canaria.",
  openGraph: {
    type: "website",
    locale: "es_ES",
    title: "Anicare",
    description: "Cuidado diario, refugio temporal y adopción responsable para mascotas en Gran Canaria.",
    url: "https://www.anicare.es",
    siteName: "Anicare"
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${inter.variable} ${nunito.variable}`}>
      <body className="font-sans text-brand-ink antialiased">
        <Header />
        <main>{children}</main>
        <Footer />
        <StickyCTA />
      </body>
    </html>
  );
}