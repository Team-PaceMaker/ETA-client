module.exports = {
  images: {
    loader: 'imgix',
    path: 'http://localhost:8888',
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.target = 'electron-renderer';
    }
    return config;
  },
};
