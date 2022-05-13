import client from './client';

export function signUpAPI(data : {email:string, nickname:string ,password:string}) {
  return client.post('/sign-up', data).then((response) => response.data);
}

export function logInAPI(data: { email: string; password: string }) {
  return client.post('/sign-in', data).then((response) => {
    const {accessToken} = response.data;
    console.log("헤더에 들어가는지 확인",accessToken)
    client.defaults.headers.common.Authorization = `${accessToken}`;
    return response.data;
  });
}

export function getUserInfoAPI() {
  return client.get('/accounts').then((response) => response.data);
}

export function logOutAPI() {
  return client.get('/logout').then((response) => response.data);
}

export function withDrawAPI() {
  return client.delete("/withdrawal").then((response) => response.data);
}