import BackIcon from 'components/icons/back';
import { IMAGES } from 'lib/assets';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { ReactNode } from "react";
import style from "styles/authLayout.module.css";

const AuthLayout = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  return (
    <div className={style.wrapper}>
      <div onClick={()=> router.back()} className={style.back}>
          <BackIcon isGray={true} />
        </div>
      <section className={style.img_section}>
        <div className={style.logo}>
          <Image src={IMAGES.ICON_SM} layout="fill" />
        </div>
      </section>
      <section className={style.form_section}>{children}</section>
    </div>
  );
};

export default AuthLayout;
