import React, { ReactNode } from 'react';
import style from 'styles/authLayout.module.css';

const AuthLayout = ({children}: {children: ReactNode}) => {

  return (
    <div className={style.wrapper}>
      <section className={style.imgSection}>
        <div className={style.logo}>Logo</div>
      </section>
      <section className={style.fromSection}>
        {children}
      </section>
    </div>
  )
}

export default AuthLayout;