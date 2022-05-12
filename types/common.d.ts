import type { NextPage } from "next";
import type { AppProps } from "next/app";

type LayoutHeader = {
  title: string;
  isBack?: boolean;
};

type NextPageWithLayout = NextPage & {
  header?: LayoutHeader;
  noNav?: boolean;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

