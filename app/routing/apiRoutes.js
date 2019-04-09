var friends = require("../data/friends.js")

module.exports = function(app) {

app.get("/api/friends", function(req, res) {
    return res.json(friends);
  });

app.post("/api/friends", function(req, res) {
    var userInput = req.body;
    var userScores = userInput.scores;
    var bestMatch = {
      name: "",
      photo: "",
      diff: 1000
    }
    var totalDiff = 0;
    for (var i=0; i< friends.length; i++) {
      var currFriend = friends[i];
      totalDiff = 0;

      for (var j=0; j<userScores.length; j++){
        var currentScores = currFriend.scores;
        totalDiff += Math.abs(parseInt(currentScores) - parseInt(userScores));
      }
      if (totalDiff < bestMatch.diff){
        bestMatch.name = currFriend.name;
        bestMatch.photo = currFriend.photo;
        bestMatch.diff = totalDiff;
      }
    }
    friends.push(req.body);

    res.json({
    matchName: bestMatch.name,
    matchPhoto: bestMatch.photo,  
  })
})
}
// A GET route with the url /api/friends. This will be used to display a JSON of all possible friends.
// A POST routes /api/friends. This will be used to handle incoming survey results. This route will also be used to handle the compatibility logic.