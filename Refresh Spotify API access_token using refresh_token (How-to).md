## Refresh Spotify API access_token using refresh_token (How-to)

#### The below is from official Spotify Documentation

e.g.
  curl -H "Authorization: Basic ZjM4Zj...Y0MzE=" -d grant_type=refresh_token -d refresh_token=NgAagA...NUm_SHo https://accounts.spotify.com/api/token

The following would be generated:
{
  "access_token":"{access_token}",
  "token_type":"Bearer",
  "expires_in":3600,
  "scope":"playlist-read-private playlist-read-collaborative ugc-image-upload user-follow-read playlist-modify-private user-read-email user-read-private app-remote-control streaming user-follow-modify user-modify-playback-state user-library-read user-library-modify playlist-modify-public user-read-playback-state user-read-currently-playing user-read-recently-played user-read-playback-position user-top-read"
}

#### Found the following on a GitHub Forum

curl -X POST -d grant_type=refresh_token -d refresh_token={refresh_token} -d client_id={CLIENT_ID} -d client_secret={CLIENT_SECRET} https://accounts.spotify.com/api/token
