import "styles/globals.css";
import type { AppProps } from "next/app";
import { DefaultSeo } from "next-seo";

const DEFAULT_SEO = {
  title: "Paws🐾",
  description: "Numble short form video Challenge Web App",
  openGraph: {
    title: "Paws🐾 - Shot Form Video Platform",
    description: "Numble short form video Challenge Web App",
  },
};

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <DefaultSeo {...DEFAULT_SEO} />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
