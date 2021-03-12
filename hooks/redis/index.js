const redis = require("redis");

module.exports = (strapi) => {
  return {
    async initialize() {
      strapi.services.redis = redis.createClient(
        strapi.config.hook.settings.redis.url
      );
    },
  };
};
