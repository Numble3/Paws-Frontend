import client  from 'apis/client';


export function imageResizeAPI(data: FormData) {
  return client.post('/images/resize',data, {
    headers:{
      'content-type': 'multipart/form-data'
    }
  }).then((response) => {
    return response.data;
  });
}

export function userUpdateAPI(data:{nickname: string, profile:string}){
  return client.post('/accounts/update', data).then((response)=> response.data);
}

export function getUsaerDetailAPI() {
  return client.get('/accounts/detail').then((response) => response.data);
}

export function getUserVideosAPI() {
  return client.get('/accounts/videos').then((response)=> response.data);
}
