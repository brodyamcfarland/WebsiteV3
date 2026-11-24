import { Toaster } from "react-hot-toast";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import Script from "next/script";
import { initAnalytics } from "../lib/track";
import Cursor from "../components/Cursor";

initAnalytics();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Component {...pageProps} />
      <Cursor />
      <Toaster />
      {/* Vercel Web Analytics: page views + the custom events in lib/track.ts.
          Served by Vercel at this path once Web Analytics is enabled on the project. */}
      {process.env.NODE_ENV === "production" && (
        <Script src="/_vercel/insights/script.js" strategy="afterInteractive" />
      )}
    </>
  );
}

export default MyApp;
