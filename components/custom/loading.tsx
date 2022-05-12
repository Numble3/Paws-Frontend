import { LogoFeet } from "components/icons";
import { useEffect } from "react";
import style from "styles/custom/loading.module.css";

const Loading = () => {
  useEffect(() => {
    const handlePreventEvent = (e: TouchEvent) => {
      e.preventDefault();
      e.stopPropagation();
    };
    document.body.addEventListener("touchmove", handlePreventEvent);
    return () => {
      document.body.removeEventListener("touchmove", handlePreventEvent);
    };
  }, []);

  return (
    <main className={style.loading}>
      <div className={style.feet}>
        <LogoFeet color="pink" />
        <LogoFeet color="red" />
        <LogoFeet color="purple" />
        <LogoFeet color="green" />
        <LogoFeet color="yellow" />
        <LogoFeet color="blue" />
      </div>
      <p className={style.text}>
        페이지를 불러오는 중이에요.
        <br />
        잠시만 기다려주세요!
      </p>
    </main>
  );
};

export default Loading;
