import type { AppProps } from "next/app";
import { Inter, Nunito } from "next/font/google";
import "../app/globals.css";

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

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className={`${inter.variable} ${nunito.variable}`}>
      <Component {...pageProps} />
    </div>
  );
}