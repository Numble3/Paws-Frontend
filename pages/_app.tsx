import LayoutContiner from "components/layout";
import { DefaultSeo } from "next-seo";
import { AppProps } from "next/app";
import "styles/globals.css";

const DEFAULT_SEO = {
  title: "Paws🐾",
  description: "Numble short form video Challenge Web App",
  openGraph: {
    title: "Paws🐾 - Shot Form Video Platform",
    description: "Numble short form video Challenge Web App",
  },
};

function MyApp({ Component, pageProps }: AppProps) {
  const noHeader =
    Component.defaultProps &&
    (Component.defaultProps as { noHeader?: boolean }).noHeader
      ? false
      : true;
  const noNav =
    Component.defaultProps &&
    (Component.defaultProps as { noNav?: boolean }).noNav
      ? false
      : true;

  return (
    <>
      <DefaultSeo {...DEFAULT_SEO} />
      <LayoutContiner {...{ noHeader, noNav }}>
        <Component {...pageProps} />
      </LayoutContiner>

      <style jsx global>
        {`
          #__next {
            width: 100%;
            height: 100%;
            display: grid;
            place-items: center;
          }
        `}
      </style>
    </>
  );
}

export default MyApp;
