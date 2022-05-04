import Router from 'next/router';
import { useEffect } from 'react';

export default function ProfilePage() {

  /* 벡엔드연동 시 user 정보를 받아옴 */
  const userInfo = false;

  useEffect(()=>{
    //user 정보가 없으면 로그인 페이지로 이동
    if(!userInfo) {
      Router.replace('/login');
    }
  },[userInfo]);

  return(
      <div>profile page</div>
  ); 
}
