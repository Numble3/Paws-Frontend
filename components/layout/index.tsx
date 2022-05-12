import { ReactNode } from "react";
import Header from "./header";
import Nav from "./nav";
import styles from "styles/layout.module.css";
import { LayoutBackArrow, LayoutHeader } from "types/common";
import LayoutBack from "./back";

export default function LayoutContainer({
  children,
  layoutHeader,
  noNav,
  hasBack,
}: {
  children: ReactNode;
  layoutHeader?: LayoutHeader;
  noNav?: boolean;
  hasBack?: LayoutBackArrow;
}) {
  console.log("hasBack", hasBack);

  return (
    <div className={styles.wrapper}>
      {layoutHeader && <Header {...layoutHeader} />}
      {!!hasBack && <LayoutBack color={hasBack.color} />}
      <main
        style={{
          paddingTop: layoutHeader && "56px",
          paddingBottom: !noNav ? "56px" : "0",
          overflow: "auto",
          height: "100%",
        }}
      >
        {children}
      </main>
      {!noNav && <Nav />}
    </div>
  );
}
