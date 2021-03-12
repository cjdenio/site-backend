const SpotifyWebApi = require("spotify-web-api-node");

module.exports = async () => {
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
    return null;
  }

  const item = resp.body.item;

  if (!item) {
    return null;
  }

  return {
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
  };
};
