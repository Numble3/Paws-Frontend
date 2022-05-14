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