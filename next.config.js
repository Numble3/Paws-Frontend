/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "dimg.donga.com",
      "upload.wikimedia.org",
      "w.namu.la",
      "img.insight.co.kr",
      "d2yok33re0ydfm.cloudfront.net",
      "i.pinimg.com",
    ],
  },
};

module.exports = nextConfig;
