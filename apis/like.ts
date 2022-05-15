import client from './client';

/* 관심영상 카테고리 별 조회 */
export async function getLikeVideosAPI({size, category}: {size:number, category:string}) {
  return await client.get('/likes',{
    params:{
      category,
      size,
    }
  }).then((response)=> {
    console.log("check:",response.data);
    return response.data;
  });
}

export function getAllLikeVideosAPI(){
  return client.get('/likes/all').then((response) => response.data);
}
