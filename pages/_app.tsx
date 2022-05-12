import LayoutContainer from "components/layout";
import { DefaultSeo } from "next-seo";
import { AppProps } from "next/app";
import wrapper from 'store/store';
import "styles/globals.css";
import { AppPropsWithLayout } from "types/common";

const DEFAULT_SEO = {
  title: "Paws🐾",
  description: "Numble short form video Challenge Web App",
  openGraph: {
    title: "Paws🐾 - Shot Form Video Platform",
    description: "Numble short form video Challenge Web App",
  },
};

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const layoutHeader = Component.header;
  const noNav = Component.noNav;

  return (
    <>
      <DefaultSeo {...DEFAULT_SEO} />
      <LayoutContainer
        {...{
          layoutHeader,
          noNav,
        }}
      >
        <Component {...pageProps} />
      </LayoutContainer>

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

export default wrapper.withRedux(MyApp);
