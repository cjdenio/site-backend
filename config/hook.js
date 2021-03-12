module.exports = ({ env }) => {
  return {
    settings: {
      redis: {
        enabled: true,
        url: env("REDIS_URL"),
      },
    },
  };
};
