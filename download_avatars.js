var request = require('request');
var env = require('dotenv').config();
var apiRoot = "https://" + process.env.GITHUB_USER+ ':' + process.env.GITHUB_TOKEN + '@api.github.com'

// console.log('Welcome to the GitHub Avatar Downloader!');

function getRepoContributors(repoOwner, repoName, cb) {

 request.get({
  url: apiRoot + "/repos/" + repoOwner  + "/" + repoName + "/contributors",
  headers: {
      'User-Agent': 'derpyfrs'
    }
  },
  function(err, response, body) {
    cb(err, JSON.parse(body));
  });
}



getRepoContributors("jquery", "jquery", function(err, result) {
  console.log("Errors:", err);

  result.forEach(function(user){
    console.log(user.avatar_url)
  });
});


