// It is a nodejs and expressjs project.
const express = require("express");

// https is used to fetch response from the API path. It is a native expressjs package and doesn't require us to create a new 'app' variable.
const https = require("https");

// body-parser is used to access tags from the html file. We'll be using it to access queryValue.
const bodyParser = require("body-parser");

// request package used to fetch data from
const request = require("request");

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

// ejs view engine has been used to use app.js variables into the output ejs file.
app.set('view engine', 'ejs');

// Variable(s) to store the data fetched from API endpoint.
var data = "";

// The page to load when the browser (client) makes request to GET something from the server on "/", i.e., from the homepage.
// This GET request is made as soon as the homepage url is entered in the address bar od browser, automatically.
app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
});

// The data that server should POST when the POST request is sent by the client, upon entering the search queryValue, in the search bar (form).
app.post("/", function(req, res) {

  // The user input query. We are using body-parser package here.
  const query = req.body.queryValue;

  // Follow procedure here to get this key: https://benwiz.com/blog/create-spotify-refresh-token/
  const token = "Bearer {access_token}" // Follow procedure here to get this key: https://benwiz.com/blog/create-spotify-refresh-token/
  var searchUrl = "https://api.spotify.com/v1/search?q=" + query + "&type=tracks&limit=4";

  request({
    url: searchUrl,
    headers: {
      "Authorization": token
    }
  }, function(err, res) {
    if (res) {
      var data = JSON.parse(res.body);
      // var spotifyTrackIdAppJs00 = data.tracks.items[0].id;
      console.log(data);
      // console.log(trackId);
    }

    // res.render("results", {
    //   spotifyTrackIdEjs00: spotifyTrackIdAppJs00
    // });
    // console.log("Value to be used in rendered file: " + spotifyTrackIdAppJs00);
  })
});

// Starting the server. Should this be placed at the top of all other commands?
app.listen(3000, function() {
  console.log("Server is running on port 3000.")
});
