import type { NextPage } from "next";
import type { AppProps } from "next/app";

type Layout = {
  header?: boolean;
  nav?: boolean;
};

type NextPageWithLayout = NextPage & {
  layoutProps: Layout;
  header?: boolean;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};
