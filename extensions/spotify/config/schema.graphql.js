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
      async spotify(a, b, c) {
        try {
          const spotifyApi = new SpotifyWebApi({
            clientId: process.env.SPOTIFY_CLIENT_ID,
            clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
            accessToken: process.env.SPOTIFY_ACCESS_TOKEN,
            refreshToken: process.env.SPOTIFY_REFRESH_TOKEN,
          });

          const refresh = await spotifyApi.refreshAccessToken();
          refresh.body.access_token;

          let resp;
          try {
            resp = await spotifyApi.getMyCurrentPlaybackState();
          } catch {
            const refresh = await spotifyApi.refreshAccessToken();
            spotifyApi.setAccessToken(refresh.body.access_token);
            resp = await spotifyApi.getMyCurrentPlaybackState();
          }

          if (resp.statusCode != 200) {
            return {
              currentSong: null,
            };
          }

          const item = resp.body.item;

          if (!item) {
            return {
              currentSong: null,
            };
          }

          return {
            currentSong: {
              name: item.name,
              url: item.external_urls.spotify,
              artists: item.artists.map((i) => {
                return {
                  name: i.name,
                  url: i.external_urls.spotify,
                };
              }),
              album: {
                name: item.album.name,
                url: item.album.external_urls.spotify,
                images: item.album.images.map((i) => i.url),
                artists: item.album.artists.map((i) => {
                  return {
                    name: i.name,
                    url: i.external_urls.spotify,
                  };
                }),
              },
            },
          };
        } catch (e) {
          throw e;
        }
      },
    },
  },
};
