import client from './client';

export function signUpAPI(data : {email:string, nickname:string ,password:string}) {
  return client.post('/sign-up', data).then((response) => response.data);
}

export function logInAPI(data: { email: string; password: string }) {
  return client.post('/user/login', data).then((response) => {
    const {access_token} = response.data;
    client.defaults.headers.common.Authorization = `Bearer ${access_token}`;
    return response.data;
  });
}

export function getUserInfoAPI() {
  return client.get('/accounts').then((response) => response.data);
}
