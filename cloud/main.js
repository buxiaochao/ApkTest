require("cloud/app.js");
// Use AV.Cloud.define to define as many cloud functions as you want.
// For example:
AV.Cloud.define("hello", function(request, response) {
   response.success(request.params.name+" say hello to world! ");
});

AV.Cloud.define("second function", function(request, response) {
  response.success("you are "+request.params.name);
});

//增加
AV.Cloud.define('save', function(request, response) {
 var GameScore = AV.Object.extend("GameScore");

var gameScore = new GameScore();
gameScore.set("score", request.params.score);
gameScore.set("playerName", request.params.playerName);
gameScore.set("cheatMode", request.params.cheatMode);
gameScore.save(null, {
  success: function(gameScore) {
    // Execute any logic that should take place after the object is saved.
    response.success('New object created with objectId: ' + gameScore.id);
  },
  error: function(gameScore, error) {
    // Execute any logic that should take place if the save fails.
    // error is a AV.Error with an error code and description.
    response.success('Failed to create new object, with error code: ' + error.message);
  }
});
});

//删除
AV.Cloud.define('delete', function(request, response){
   var GameScore = AV.Object.extend("GameScore");
   
   var query = new AV.Query(GameScore);
   query.equalTo("playerName",request.params.playerName);
   query.find({
      success:function(results){
	     var object = results[0];

		 console.log(object);
		 object.destroy();

		 response.success("delete success");
	  },
	  error: function(error) {
	      console.log("Error: " + error.code + " " + error.message);
	   }
   });
});

//修改
AV.Cloud.define('update', function(request, response){
   var GameScore = AV.Object.extend("GameScore");
   //var score = request.params.score;
   var query = new AV.Query(GameScore);
   query.equalTo("playerName",request.params.playerName);
   query.find({
       success:function(results){
	      var object = results[0];

		  object.set("score",request.params.score);
		  object.save();
		  response.success("update success");
	   },
	   error: function(error) {
	      console.log("Error: " + error.code + " " + error.message);
	   }
   });

});


//查询
AV.Cloud.define('select', function(request, response){
   var GameScore = AV.Object.extend("GameScore");

   var query = new AV.Query(GameScore);
   query.equalTo("playerName",request.params.playerName);
   query.find({
       success:function(results){
	      var object = results[0];
		  response.success("------ "+ object.get("playerName") +"'s score is: "+ object.get("score"));		  
	   },
	   error: function(error) {
	      console.log("Error: " + error.code + " " + error.message);
	   }
   });

});

//查询方法2
AV.Cloud.define('_select', function(request, response){
   var GameScore = AV.Object.extend("GameScore");

   var query = new AV.Query(GameScore);
   var object = query.get(request.params.playerName);
  

});