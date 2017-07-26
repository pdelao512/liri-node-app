
// Load Required Node Modules
var twitter = require('twitter');
var spotify = require('node-spotify-api');
var request = require('request');
var keys = require('./keys.js');
var omdb = require("omdb");
var fs = require('fs');
var command = process.argv[2];


//get info for key file.
var client = new twitter({
      consumer_key: key.twitterKeys.consumer_key,
      consumer_secret: key.twitterKeys.consumer_secret,
      access_token_key: key.twitterKeys.access_token_key,
      access_token_secret: key.twitterKeys.access_token_secret,
  });
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
if (process.argv[2] === "spotify-this-song" && process.argv[3]){
  var song = process.argv[3];
  var params = {type: "track",query: song, limit: 5};
  var client = new Spotify(keys.spotifyKeys);

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
if (command === "movie-this"){
var nodeArgs = process.argv;
// Create an empty variable for holding the song name
    var movie = "";
// Loop through all the words in the node argument
for (var i = 3; i < nodeArgs.length; i++) {
    if (i > 3 && i < nodeArgs.length) {
    movie = movie + "+" + nodeArgs[i];
    //else and close if
    }else{
    movie += nodeArgs[i];
  }// close the else
} // close the for loop
 request('http://www.omdbapi.com/?t='+ movie + 'tt3896198&apikey=ee9c2946', function (error, response, body) {
        if (!error) {
          // console.log(JSON.parse(body).Title);
          var parsed = JSON.parse(body);
            console.log("Title: " + parse.Title);
            console.log("Year: " + parse.Year);
            console.log("IMDB Ratings: " + parse.Ratings[0]);
            console.log("Language: " + parse.Language);
            console.log("Plot: " + parse.Plot);
            console.log("Actors: " + parse.Actors);
            console.log("Rotten Tomatoes: " + parse.Ratings[1]);
        }// end of if
        else{
          console.log("Error!" + error);
        }
});// end of function

}; // end if command