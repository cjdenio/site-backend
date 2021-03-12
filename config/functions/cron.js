"use strict";

const SpotifyWebApi = require("spotify-web-api-node");
const { default: createStrapi } = require("strapi");

/**
 * Cron config that gives you an opportunity
 * to run scheduled jobs.
 *
 * The cron format consists of:
 * [SECOND (optional)] [MINUTE] [HOUR] [DAY OF MONTH] [MONTH OF YEAR] [DAY OF WEEK]
 *
 * See more details here: https://strapi.io/documentation/v3.x/concepts/configurations.html#cron-tasks
 */

module.exports = {
  "* * * * *": async () => {
    const spotifyData = await strapi.config.functions.spotify();

    strapi.services.redis.set(
      "spotify:currentSong",
      JSON.stringify(spotifyData),
      () => {
        strapi.log.info("Successfully cached Spotify data");
      }
    );
  },
};
