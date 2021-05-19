https: //benwiz.com/blog/create-spotify-refresh-token/
http%3A%2F%2Flocalhost%3A3000%2F

  To get the access_token
for spotify API.:

  Step 1: Get clientId and clientSecrent from spotify dashboard by creating an app there.
const clientId = "1d8f00df80744197bb5c03ef30dbde8c";
const clientSecret = "71813a552f434f3493aaea1184f87abe";

Step 2: Go to the following link and grant access.
https: //accounts.spotify.com/authorize?response_type=code&client_id=$CLIENT_ID&scope=$SCOPE&redirect_uri=$REDIRECT_URI
  e.g.,
  https://accounts.spotify.com/authorize?response_type=code&client_id=1d8f00df80744197bb5c03ef30dbde8c&scope=$user-read-playback-state&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2F

  Step 3: The link would generate the following URL.
The link would be similar to:
  curl - d client_id = $CLIENT_ID - d client_secret = $CLIENT_SECRET - d grant_type = authorization_code - d code = $CODE - d redirect_uri = $REDIRECT_URI https: //accounts.spotify.com/api/token

  Copy the code from there, it looks something like this:
  AQC7oRkvAXpeZeDMLDKEGqeOw0RYrrgfYlpiOXINcJqtzRmNX5x5Uhf3xwAIqD1PUe_W2_4TF1ODtMjHLqAGjIFb-Cxo7lNx-vS9NeKMCDargJA_tnqYXZaMFmfjIT-gPTYzLpVDdRNP8JKa9Ek-qXASp-6v43ARU7A

Step 4: Run the following command in terminal or cmd.
Copy and paste the following code in cmd:
  curl -d client_id=$CLIENT_ID -d client_secret=$CLIENT_SECRET -d grant_type=authorization_code -d code=$CODE -d redirect_uri=$REDIRECT_URI https://accounts.spotify.com/api/token
  e.g.,
  curl -d client_id=1d8f00df80744197bb5c03ef30dbde8c -d client_secret=71813a552f434f3493aaea1184f87abe -d grant_type=authorization_code -d code=AQC7oRkvAXpeZeDMLDKEGqeOw0RYrrgfYlpiOXINcJqtzRmNX5x5Uhf3xwAIqD1PUe_W2_4TF1ODtMjHLqAGjIFb-Cxo7lNx-vS9NeKMCDargJA_tnqYXZaMFmfjIT-gPTYzLpVDdRNP8JKa9Ek-qXASp-6v43ARU7A -d redirect_uri=http%3A%2F%2Flocalhost%3A3000%2F https://accounts.spotify.com/api/token

  The following would be gerenated.
  {
  "access_token": "BQCFsifa8UURfXZB45Nb6ANJVLIhuBC-_1ejvj2y7DnsR9jc042Q-QF4tYufASD8_jdIXMN5ya4tvnX9KZ4NYvMaaIkoB7EDWmdqWnMKoIg8UC8zyU1OvUE4behXpYNTNQkI0bbwxM6n0Pox6lwP8Cj7KRZyjTUxaA",
  "token_type": "Bearer",
  "expires_in": 3600,
  "refresh_token": "AQAe7HonySukkEBiYhTLAO-5DsmQFbnEvWa38ibJgmIcr9z5Ts0F1tSlCDjKhaTmsBcOK_FfEprS9SG7TeHLpKZIJd8ioGDqpQPdcEv7vYbtVd4KOWnSOfv80W0awRtlbr0"
}
