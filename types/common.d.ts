import type { NextPage } from "next";
import type { AppProps } from "next/app";

type LayoutHeader = {
  title?: string;
};

type LayoutBackArrow = {
  color: "white" | "gray";
};

type NextPageWithLayout = NextPage & {
  header?: LayoutHeader | boolean;
  back?: LayoutBackArrow;
  noNav?: boolean;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

