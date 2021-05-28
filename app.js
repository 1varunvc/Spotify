// It is a nodejs, expressjs project.
const express = require("express");

// 'https' is used to fetch response from the API path. It is a native expressjs package and doesn't require us to create a new 'app' constant.
const https = require("https");

// 'body-parser' is used to access tags from the html file. We'll be using it to access queryValue.
const bodyParser = require("body-parser");

// axios package; to fetch data from search endpoint. This gives data in parsed form.
const axios = require("axios");

// 'node-cron' package is being used to scheduele the refresh of tokens.
const cron = require('node-cron');

// This app constant is created to be able to access the menthods available in 'express' package.
const app = express();

// 'urlencoded' helps access html data. Other data formats could JSON etc.
// body-parser required as to exclusively define "extended: true" although this is no use to us.
app.use(bodyParser.urlencoded({
  extended: true
}));

// This sets a static directory to look for source files like css, js, img. These file links are mentioned in html or ejs files.
// A folder named 'public' has to be in the same directory as "app.js". The source files are stored here.
app.use(express.static("public"));

// ejs view engine has been used to use app.js letiables into the output ejs file.
app.set('view engine', 'ejs');

// Starting the server.
app.listen(3000, function() {
  console.log("Server is running on port 3000.")
})

// Variables to store the data fetched from API endpoint.
let spotifyResult = "";

let i = 0;
let j = 0;
let k = 0;

let spotifyTrackIdAppJs = [];
let spotifyTrackArtistIdAppJs = [];
let spotifyQueryArtistIdAppJs = [];
let spotifyAlbumIdAppJs = [];

let spotifyTrackArtistIdUniqueAppJs = [];
let spotifyAlbumIdUniqueAppJs = [];

// // https://stackoverflow.com/a/9229784/14597561
// let s = ""; // 's' stands for Set.
// let it = "";


function removeDuplicatesFromResults(arr) {
  var obj = {};
  var ret_arr = [];
  for (var i = 0; i < arr.length; i++) {
    obj[arr[i]] = true;
  }
  for (var key in obj) {
    ret_arr.push(key);
  }
  arr = ret_arr;
  return arr;
}

// The page to load when the browser (client) makes request to GET something from the server on "/", i.e., from the homepage.
// This GET request is made as soon as the homepage url is entered in the address bar od browser, automatically.
app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
});

//Declaring token.
let refresh_token = "{refresh_token}";
let authorization = "Basic " + {Base64Encoded clientId:clientSecret};
let access_token = "";
let token = "Bearer " + access_token;

// Creating the first access token
axios({
  url: "https://accounts.spotify.com/api/token",
  method: "post",
  params: {
    grant_type: "refresh_token",
    refresh_token: refresh_token
  },
  headers: {
    Authorization: authorization,
    "Accept": "application/json",
    "Content-Type": "application/x-www-form-urlencoded"
  }
}).then(function(response) {
  // console.log(response.data);
  // console.log(response.data.access_token);
  access_token = response.data.access_token;
  token = "Bearer " + access_token;
  console.log(token);
}).catch(function(error) {
  console.log(error);
});

// Refreshing access_token, 59th minute of every hour. E.g., 04:59, 15:59.
// It is irrespective of the starting time of the server. I.e., if the server starts at 04:15, the following code would run at 04:59.
cron.schedule('*/59 * * * *', () => {
  axios({
    url: "https://accounts.spotify.com/api/token",
    method: "post",
    params: {
      grant_type: "refresh_token",
      refresh_token: refresh_token
    },
    headers: {
      Authorization: authorization,
      "Accept": "application/json",
      "Content-Type": "application/x-www-form-urlencoded"
    }
  }).then(function(response) {
    // console.log(response.data);
    // console.log(response.data.access_token);
    access_token = response.data.access_token;
    token = "Bearer " + access_token;
    console.log(token);
  }).catch(function(error) {
    console.log(error);
  });
});


// The data that server should POST when the POST request is sent by the client, upon entering the search queryValue, in the search bar (form).
app.post("/", function(req, res) {

  // The user input query. We are using body-parser package here.
  const query = req.body.queryValue;

  // Follow procedure here to get access_token and refresh_token: https://benwiz.com/blog/create-spotify-refresh-token/
  let searchUrl = "https://api.spotify.com/v1/search?q=" + query + "&type=track%2Calbum%2Cartist&limit=4&market=IN";

  //Using Axios to fetch data. It gets parsed to JSON automatically.
  axios.get(searchUrl, {
      headers: {
        'Authorization': token,
      }
    })
    .then((resAxios) => {

      // console.log(resAxios.data)
      spotifyResult = resAxios.data;

      //Extracting required data from 'result'. The following "items[0].id.videoId" is the address of the data that we need from the JSON 'ytResult'.

      // Allocating values to Track 00, 01, 02, 03.
      for (i = 0; i < (spotifyResult.tracks.items).length; i++) {
        spotifyTrackIdAppJs[i] = spotifyResult.tracks.items[i].id;
        console.log("Track 0" + i + " ID: " + spotifyTrackIdAppJs[i]);
      }
      console.log("\n");

      console.log("\n");
      // Allocating values to all the artists of Track 00.
      for (i = 0; i < (spotifyResult.tracks.items[0].artists).length; i++) {
        spotifyTrackArtistIdAppJs[i] = spotifyResult.tracks.items[0].artists[i].id;
        console.log("Track 00 Artist 0" + i + " ID: " + spotifyTrackArtistIdAppJs[i]);
      }
      console.log("\n");

      // Allocating values to all the artists of Track 01.
      j = 0;
      for (i = (spotifyResult.tracks.items[0].artists).length; i < ((spotifyResult.tracks.items[0].artists).length + (spotifyResult.tracks.items[1].artists).length); i++) {
        spotifyTrackArtistIdAppJs[i] = spotifyResult.tracks.items[1].artists[j].id;
        j++;
        console.log("Track 01 Artist 0" + i + " ID: " + spotifyTrackArtistIdAppJs[i]);
      }
      console.log("\n");

      // Allocating values to all the artists of Track 02.
      j = 0;
      for (i = ((spotifyResult.tracks.items[0].artists).length + (spotifyResult.tracks.items[1].artists).length); i < ((spotifyResult.tracks.items[0].artists).length + (spotifyResult.tracks.items[1].artists).length + (spotifyResult.tracks.items[2].artists).length); i++) {
        spotifyTrackArtistIdAppJs[i] = spotifyResult.tracks.items[2].artists[j].id;
        j++;
        console.log("Track 02 Artist 0" + i + " ID: " + spotifyTrackArtistIdAppJs[i]);
      }
      console.log("\n");

      // Removing redundant artists from spotifyTrackArtistIdAppJs and adding the unique values to spotifyTrackArtistIdUniqueAppJs.
      // This is being done, because same artist was being displayed in the 'Artists' secction.
      spotifyTrackArtistIdUniqueAppJs = removeDuplicatesFromResults(spotifyTrackArtistIdAppJs);
      console.log("Unique Track Artists:")
      console.log(spotifyTrackArtistIdUniqueAppJs);
      console.log("\n");

      // Allocating values to 4 artists if the user searches by Artist name. I.e., results matching query value.
      // Values are allocated only if the values exist.
      if (spotifyResult.artists.items) {
        for (i = 0; i < (spotifyResult.artists.items).length; i++) {
          spotifyQueryArtistIdAppJs[i] = spotifyResult.artists.items[i].id;
          console.log("Top Query Result 0" + i + " Artist ID: " + spotifyQueryArtistIdAppJs[i]);
        }
      }
      console.log("\n");

      // Providing album, if the user searches by Track name. (Or artist name.)
      // Allocating value to Album 00 of Track 00. This particular value is being alloted in 0th place of this array.
      // QueryArtists are all unique.
      spotifyAlbumIdAppJs[0] = spotifyResult.tracks.items[0].album.id;
      console.log("Track 00 Album 00 ID: " + spotifyAlbumIdAppJs[0])
      console.log("\n");

      // Allocating value to Album 00 of Track 01. This particular value is being alloted in 1st place of this array.
      // This album would be shown only if the album ID of track 00 and track 02 are unequal. This logic would be implemented in EJS file.
      spotifyAlbumIdAppJs[1] = spotifyResult.tracks.items[1].album.id;
      console.log("Track 01 Album 00 ID: " + spotifyAlbumIdAppJs[0])
      console.log("\n");

      // Providing album, if the user searches by album name. (Or artist name.)
      // Allocating value to 4 Albums that match the queryValue.
      // '1' is 'added' in the condition below, because we are aiming for i(max.) = 5. As per API URL, (spotifyResult.albums.items).length = 4.
      // If we add '1' to this '4', we would achieve the max. 'i'. To change this value in future, we would need to modify '+1' as per requirement.
      // We are doing 'i-2' because, we want to story the value of 'first' album item in spotifyAlbumIdAppJs[2].
      for (i = 2; i <= ((spotifyResult.albums.items).length) + 1; i++) {
        spotifyAlbumIdAppJs[i] = spotifyResult.albums.items[i - 2].id;
        console.log("Top Result 0" + i + " Album ID: " + spotifyAlbumIdAppJs[i]);
      }
      console.log("\n");

      // Removing redundant albums.
      spotifyAlbumIdUniqueAppJs = removeDuplicatesFromResults(spotifyAlbumIdAppJs);
      console.log("Unique Albums:")
      console.log(spotifyAlbumIdUniqueAppJs);
      console.log("\n");

      // The 'results' named EJS file is rendered and fed in response. The 'required' data is passed into it using the following letiable(s).
      // A folder named 'views' has to be in the same directory as "app.js". That folder contains 'results.ejs'.
      res.render("results", {
        spotifyTrackIdEjs: spotifyTrackIdAppJs,
        spotifyTrackArtistIdUniqueEjs: spotifyTrackArtistIdUniqueAppJs,
        spotifyQueryArtistIdEjs: spotifyQueryArtistIdAppJs,
        spotifyAlbumIdUniqueEjs: spotifyAlbumIdUniqueAppJs
      })

      // Emptying all the arrays. Not all the elements are over-ridden in the coming calls.
      // For e.g., a Track with 4 artists, may assign values to first 4 places in the array.
      // If the next query returns a Track with 1 artist, first place will be over-ridden while the next 3 places would keep the previous values which may interfere while showing results.ejs.
      spotifyTrackIdAppJs.length = 0;

      spotifyTrackArtistIdAppJs.length = 0;
      spotifyTrackArtistIdUniqueAppJs.length = 0;

      spotifyQueryArtistIdAppJs.length = 0;

      spotifyAlbumIdAppJs.length = 0;
      spotifyAlbumIdUniqueAppJs.length = 0;
    })
    .catch((error) => {
      console.error(error)
      // console.log("Error: '" + error.response.status + "': " + error.response.statusText);
    })
});
