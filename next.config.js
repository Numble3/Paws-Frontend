/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "dimg.donga.com",
      "upload.wikimedia.org",
      "w.namu.la",
      "img.insight.co.kr",
      "i.pinimg.com",
      "d2yok33re0ydfm.cloudfront.net",
      "i.pinimg.com",
      "d2yok33re0ydfm.cloudfront.net",
      "numble-image.s3.ap-northeast-2.amazonaws.com",
    ],
  },
};

module.exports = nextConfig;
