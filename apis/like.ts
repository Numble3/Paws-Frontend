import client from './client';

/* 관심영상 카테고리 별 조회 */
export function getLikeVideosAPI() {
  return client.get('/likes').then((response)=> response.data);
}

export function getAllLikeVideosAPI(){
  return client.get('/likes/all').then((response) => response.data);
}
