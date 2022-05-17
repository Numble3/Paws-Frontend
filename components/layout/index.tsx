import { ReactNode } from "react";
import Header from "./header";
import Nav from "./nav";
import styles from "styles/layout.module.css";
import { LayoutBackArrow, LayoutHeader } from "types/common";
import LayoutBack from "./back";
import useMessage from "hooks/use-message";
import CustomMessage from "components/custom/message";
import { useSelector } from "react-redux";
import { RootState } from "reducers";

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
  const { getMessage, error } = useMessage();

  const errorMessage = useSelector(
    (state: RootState) => state.modal.errorMessage
  );

  return (
    <>
      <div className={styles.wrapper}>
        {layoutHeader && <Header {...layoutHeader} />}
        {!!hasBack && <LayoutBack color={hasBack.color} />}
        <main
          style={{
            paddingTop: layoutHeader && "56px",
            paddingBottom: !noNav ? "56px" : "0",
            // overflow: "auto",
            // height: "100%",
          }}
        >
          {children}
        </main>
        {!noNav && <Nav />}
      </div>
      {getMessage && (
        <CustomMessage isError={error} ErrorMessage={errorMessage} />
      )}
    </>
  );
}
