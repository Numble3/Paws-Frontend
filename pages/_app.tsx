import LayoutContainer from "components/layout";
import { DefaultSeo } from "next-seo";
import { useEffect, useRef } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import wrapper from "store/store";
import "styles/globals.css";
import { AppPropsWithLayout } from "types/common";
import { ReactQueryDevtools } from "react-query/devtools";
import { useRouter } from "next/router";

const DEFAULT_SEO = {
  title: "Paws🐾",
  description: "Numble short form video Challenge Web App",
  openGraph: {
    title: "Paws🐾 - Shot Form Video Platform",
    description: "Numble short form video Challenge Web App",
  },
};

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const router = useRouter();
  const layoutHeader = Component.header;
  const hasBack = Component.back;
  const noNav = Component.noNav;

  const queryClientRef = useRef<QueryClient>();
  if (!queryClientRef.current) {
    queryClientRef.current = new QueryClient();
  }
  // MOBILE
  useEffect(() => {
    const UserAgent = navigator.userAgent;
    const isMobile =
      UserAgent.match(
        /iPhone|iPod|Android|Windows CE|BlackBerry|Symbian|Windows Phone|webOS|Opera Mini|Opera Mobi|POLARIS|IEMobile|lgtelecom|nokia|SonyEricsson/i
      ) != null || UserAgent.match(/LG|SAMSUNG|Samsung/) != null;

    //TODO: mobile error page
    if (!isMobile && router.asPath !== "/mobile") router.replace("/mobile");
    if (isMobile && router.asPath === "/mobile") router.replace("/");
  }, []);

  return (
    <>
      <QueryClientProvider client={queryClientRef.current}>
        <DefaultSeo {...DEFAULT_SEO} />
        <LayoutContainer
          {...{
            layoutHeader,
            noNav,
            hasBack,
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
        <ReactQueryDevtools initialIsOpen={false} position={"top-right"} />
      </QueryClientProvider>
    </>
  );
}

export default wrapper.withRedux(MyApp);
