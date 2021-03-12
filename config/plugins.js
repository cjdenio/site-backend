if (process.env.NODE_ENV == "production") {
  module.exports = ({ env }) => ({
    upload: {
      provider: "tp-minio",
      providerOptions: {
        accessKey: env("MINIO_ACCESS_KEY"),
        secretKey: env("MINIO_SECRET_KEY"),
        bucket: env("MINIO_BUCKET"),
        endPoint: env("MINIO_ENDPOINT"),
        port: 80,
        useSSL: false,
        isDocker: true,
        folder: "assets",
        host: env("MINIO_ENDPOINT"),
      },
    },
  });
} else {
  module.exports = ({ env }) => {};
}
