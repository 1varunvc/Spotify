## Get Spotify API access_token and refresh_token (How-To)

Method 1: https://benwiz.com/blog/create-spotify-refresh-token/

Method 2: https://developer.spotify.com/documentation/general/guides/authorization-guide/ (Using Authorization Code Flow)

URL Encoded redirect_uri:
  http%3A%2F%2Flocalhost%3A3000%2F

A bookmark:
Code Flow: https://stackoverflow.com/questions/67595108/error-status-400-message-bad-search-type-field-tracks-while-using

##### Step 1: Get clientId and clientSecret from spotify dashboard by creating an app there. You would need to have a spotify account, login using it.

clientId

clientSecret


clientId:clientSecret


Base64Encoded clientId:clientSecret


##### Step 2: Go to the following link and grant access:
(&scope is optional for the link below.)

https://accounts.spotify.com/authorize?response_type=code&client_id=$CLIENT_ID&scope=$SCOPE&redirect_uri=$REDIRECT_URI

##### Step 3: The link would generate the following URL.

The link would be similar to:
  https://example.com/?code=$CODE

Copy the code from there.

#####Step 4: Run the following command in terminal or cmd.

###### Method 1:
curl -d client_id=$CLIENT_ID -d client_secret=$CLIENT_SECRET -d grant_type=authorization_code -d code=$CODE -d redirect_uri=$REDIRECT_URI https://accounts.spotify.com/api/token


The following would be gerenated.
{"access_token":"{access_token}",
"token_type":"Bearer",
"expires_in":3600,
"refresh_token":"{refresh_token}",
"scope":"user-read-playback-state user-read-email"}

###### Method 2:
curl -H "Authorization: Basic *<base64 encoded client_id:client_secret>*" -d grant_type=authorization_code -d code=*<code_from_step_3>*-d redirect_uri=*<redirect_uri>* https://accounts.spotify.com/api/token

e.g.,
  curl -H "Authorization: Basic ZjM...zE=" -d grant_type=authorization_code -d code=MQCbtKe...44KN -d redirect_uri=https%3A%2F%2Fwww.foo.com%2Fauth https://accounts.spotify.com/api/token


The following code would be generated:
{"access_token":"{access_token}",
"token_type":"Bearer",
"expires_in":3600,
"refresh_token":"{refresh_token}",
"scope":"user-read-playback-state user-read-email"}
