 var level=0;
  var userClickedPattern=[];
 var started=false;
 var buttonColours=["red","blue","green","yellow"];

 var gamePattern=[];

 function nextSequence()
  {  userClickedPattern=[];
    var randomNumber= Math.floor(Math.random()*4);
     var randomChosenColour=buttonColours[randomNumber];
      gamePattern.push(randomChosenColour);
       $("#"+randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
      playSound(randomChosenColour);
      level++;
      $("h1").text("Level "+level);
  }

  $(".btn").on("click",function(){
     var userChosenColour=$(this).attr("id");
   userClickedPattern.push(userChosenColour);
  /*   console.log(userClickedPattern);  */
     playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
  })

  function playSound(name)
  {
    var audio= new Audio("sounds/"+ name +".mp3");
       audio.play();
  }

  function animatePress(currentColour)
  {
    $("#"+currentColour).addClass("pressed");
    setTimeout(function(){
       $("#"+currentColour).removeClass("pressed");
    },80);
  }
   var times=[];

  $(document).on("keypress",function(event){
    if(!started && event.key=="a")
     {
       $("#level-title").text("Level " + level);
       nextSequence();
       started = true;
     }
     else
     {
       alert("Press A to Start Game");
     }

  });

  function checkAnswer(currentLevel)
  {
     if(gamePattern[currentLevel]===userClickedPattern[currentLevel])
      {
        console.log("Success");
          if (userClickedPattern.length === gamePattern.length)
          {
             setTimeout(nextSequence(),4000);
          }
      }

      else
      {
        console.log("Failure");
         playSound("wrong");
         $("body").addClass("game-over");
         setTimeout(function(){
           $("body").removeClass("game-over");
         },200);
         $("h1").text("Game Over,Press Any Key to Restart");

           startOver();
      }

    }

   function startOver()
   {
     level=0;
     gamePattern=[];
     started=false;
   }
