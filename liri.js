
// Load Required Node Modules
var twitter = require('twitter');
var spotify = require('node-spotify-api');
var request = require('request');
var keys = require('./keys.js');
// var omdb = require("omdb");
var fs = require('fs');
var command = process.argv[2];


//get info for key file.
var client = new twitter(keys.twitterKeys);
      // consumer_key: key.twitterKeys.consumer_key,
      // consumer_secret: key.twitterKeys.consumer_secret,
      // access_token_key: key.twitterKeys.access_token_key,
      // access_token_secret: key.twitterKeys.access_token_secret,
  // };
//add screen name to pull up tweets
  var params = {screen_name: 'Watson5122'};
//if the item in the second index is 'my-tweets', this will run.
if (command === "my-tweets"){
client.get('statuses/user_timeline', params, function(error, tweets, response) {
          //need to loop through, otherwise will just override latest one.
          if (!error) {
            for (var i = 0; i < tweets.length; i++)
            //tweets is an object. We can access info from tweets using JSON
             {
                console.log("tweets: " + tweets[i].text + "\r\n" +"time: " + tweets[i].created_at);
                }
         }else {
            console.log("Error!" + error);
             }
  });
};
//===============================================================================
//if the second index item is 'spotify-this-song', then this will run.

if (process.argv[2] === "spotify-this-song"){
  var song = process.argv[3];
  var params = {type: "track",query: song, limit: 5};
  var client = new spotify(keys.spotifyKeys);

client.search(params, function(err,data){
    if (err) {
        return console.log('Error occurred: ' + err);
     }

    else{
      for(i=0;i<5;i++){
        console.log("--------------------------------------------");
        console.log("Artist: " + data.tracks.items[i].album.artists[0].name);
        console.log("Song: " + data.tracks.items[i].name);
        console.log("Preview Link: " + data.tracks.items[i].preview_url);
        console.log("Album: " + data.tracks.items[i].album.name);
        console.log("--------------------------------------------");
      }
    }
    
    }); //close the spotify search
}; //close the spotify if command statement

//==================================================================
if (process.argv[2] === "movie-this"){
  var movie = process.argv[3];
  var queryURL = "http://www.omdbapi.com/?t=" + movie + "&y=&plot=full&tomatoes=true&r=json&apikey=40e9cece";

  request(queryURL, function(error, response, body) {
        if (!error) {
          // console.log(JSON.parse(body).Title);
          // var parse = JSON.parse(body);
            console.log("Title: " + JSON.parse(body).Title);
            console.log("Year: " + JSON.parse(body).Year);
            console.log("IMDB Ratings: " + JSON.parse(body).imdbRating);
            console.log("Language: " + JSON.parse(body).Language);
            console.log("Actors: " + JSON.parse(body).Actors);
            console.log("Rotten Tomatoes: " + JSON.parse(body).Ratings[1].value);

        var movieData = "\nTitle: " + JSON.parse(body).Title + "\nRelease Year: " + JSON.parse(body).Year + "\nIMDB Rating: " + JSON.parse(body).imdbRating + "\nRotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value + "\nCountry Produced: " + JSON.parse(body).Country + "\nLanguage: " + JSON.parse(body).Language + "\nPlot: " + JSON.parse(body).Plot + "\nActors: " + JSON.parse(body).Actors;
        
        fs.appendFile("log.txt", movieData, function(err) {
            if (err) {
              console.log(err);
            }
             else {
                console.log("Content Added!");
            }
      });
    
   
    }
    });
}
//=========================================================================
 if (process.argv[2] === "do-what-it-says"){

  fs.readFile("random.txt", "UTF8", function(error, data) {

   dataArray = data.split(",");
    song = dataArray[1];
    var params = {type: "track",query: song, limit: 5};

   var client = new spotify(keys.spotifyKeys);
    client.search(params, function(err,data){
    if (err) {
        return console.log('Error occurred: ' + err);
     }
    else{
      for(i=0;i< 1;i++){
        console.log("--------------------------------------------");
        console.log("Artist: " + data.tracks.items[i].artists[0].name);
        console.log("Song: " + data.tracks.items[i].name);
        console.log("Preview Link: " + data.tracks.items[i].preview_url);
        console.log("Album: " + data.tracks.items[i].album.name);
        console.log("--------------------------------------------");
      }
    }
  });

  });
}