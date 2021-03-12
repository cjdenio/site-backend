const SpotifyWebApi = require("spotify-web-api-node");

module.exports = {
  definition: `
  type Spotify {
      currentSong: Song
  }
  type Song {
    name: String!
    url: String!
    artists: [Artist!]!
    album: Album!
  }
  type Artist {
    name: String!
    url: String!
  }
  type Album {
    name: String!
    url: String!
    artists: [Artist!]!
    images: [String!]!
  }
  `,
  query: `
    spotify: Spotify!
  `,
  type: {},
  resolver: {
    Query: {
      spotify(a, b, c) {
        return {};
      },
    },
    Spotify: {
      currentSong(a, b, c) {
        return new Promise((resolve, reject) => [
          strapi.services.redis.get("spotify:currentSong", (err, result) => {
            if (err) {
              strapi.log.error(err);
              resolve(null);
            } else {
              resolve(JSON.parse(result));
            }
          }),
        ]);
      },
    },
  },
};
