var request = require('request');
var env = require('dotenv').config();
var apiRoot = "https://" + process.env.GITHUB_USER+ ':' + process.env.GITHUB_TOKEN + '@api.github.com'
var fs = require('fs');
var userInput = process.argv.slice(2);

if (userInput.length !== 2) {
  console.log('Incorrect input, please provide Repo Owner and Repo Name');
  return;
}

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

getRepoContributors(userInput[0], userInput[1], (err, result) => {
  console.log("Errors:", err);

  result.forEach(function(user) {
    var filePath = './' + user.login + '.jpeg';
    console.log(user.avatar_url);
    downloadImageByURL(user.avatar_url, filePath);
  });
});

function downloadImageByURL(url, filePath) {
  request.get(url).pipe(fs.createWriteStream(filePath));
}
