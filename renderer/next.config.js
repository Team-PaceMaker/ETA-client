module.exports = {
  images: {
    loader: 'imgix',
    path: 'https://etas3bucket.s3.ap-northeast-2.amazonaws.com',
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.target = 'electron-renderer';
    }
    return config;
  },
};
