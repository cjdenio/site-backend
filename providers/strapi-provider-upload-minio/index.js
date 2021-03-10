module.exports = {
  init(providerOptions) {
    // init your provider if necessary

    return {
      upload(file) {
        // upload the file in the provider
        strapi.log.info(file);
      },
      delete(file) {
        // delete the file in the provider
        strapi.log.info(file);
      },
    };
  },
};
