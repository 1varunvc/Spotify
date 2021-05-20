// It is a nodejs, expressjs project.
const express = require("express");

// 'https' is used to fetch response from the API path. It is a native expressjs package and doesn't require us to create a new 'app' letiable.
const https = require("https");

// 'body-parser' is used to access tags from the html file. We'll be using it to access queryValue.
const bodyParser = require("body-parser");

// request package; to fetch data from search endpoint.
const request = require("request");

const axios = require("axios");

var FormData = require('form-data');
var fs = require('fs');

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

// letiable(s) to store the data fetched from API endpoint.
let spotifyTrackIdAppJs00 = "";
let spotifyAlbumIdAppJs00 = "";
let spotifyArtistIdAppJs00 = "";
let spotifyResult = "";

// The page to load when the browser (client) makes request to GET something from the server on "/", i.e., from the homepage.
// This GET request is made as soon as the homepage url is entered in the address bar od browser, automatically.
app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
});

//Declaring token.
let access_token = "";
let token = "";

// //Refreshing access_token
axios({
    url: "https://accounts.spotify.com/api/token",
    method: "post",
    params: {
        grant_type: "refresh_token",
        refresh_token: {refresh_token}
    },
    headers: {
      Authorization:'Basic *<base64 encoded client_id:client_secret>*',
        "Accept": "application/json",
        "Content-Type": "application/x-www-form-urlencoded"
    }
}).then(function (response) {
    // console.log(response.data);
    // console.log(response.data.access_token);
    access_token = response.data.access_token;
    token = "Bearer " + access_token;
    // console.log(token);
}).catch(function (error) {
    console.log(error);
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
      console.log(resAxios.data)
      spotifyResult = resAxios.data;

      //Extracting required data from 'result'. The following "items[0].id.videoId" is the address of the data that we need from the JSON 'ytResult'.
      let spotifyTrackIdAppJs00 = spotifyResult.tracks.items[0].id;
      let spotifyAlbumIdAppJs00 = spotifyResult.tracks.items[0].album.id;
      let spotifyArtistIdAppJs00 = spotifyResult.tracks.items[0].artists[0].id;
      console.log("Fetched values: " + spotifyTrackIdAppJs00 + ", " + spotifyAlbumIdAppJs00 + ", " + spotifyArtistIdAppJs00);

      // The 'results' named EJS file is rendered and fed in response. The 'required' data is passed into it using the following letiable(s).
      // A folder named 'views' has to be in the same directory as "app.js". That folder contains 'results.ejs'.
      res.render("results", {
        spotifyTrackIdEjs00: spotifyTrackIdAppJs00,
        spotifyAlbumIdEjs00: spotifyAlbumIdAppJs00,
        spotifyArtistIdEjs00: spotifyArtistIdAppJs00
      });
      console.log("Values to be used in rendered file: " + spotifyTrackIdAppJs00 + ", " + spotifyAlbumIdAppJs00 + ", " + spotifyArtistIdAppJs00);
    })
    .catch((error) => {
      console.error(error)
    })
});
// Starting the server. Should this be placed at the top of all other commands?
app.listen(3000, function() {
  console.log("Server is running on port 3000.")
})
