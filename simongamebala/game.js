// making an array for choosing colors

var colors = ["red", "green", "yellow", "blue"];

// making an array for storing the automatic playing patter sequence and user playing patttern sequence

var autoPlayingPattern = [];
var userPlayingPattern = [];

// making variables for increasing level and starting game condition
var level = 0;
var startingGame = false;

// starting game after clickig any letter in keyboard
$(".heading").click(function () {
  if (!startingGame) {

    $(".main-container").removeClass("backgroundImage");
    $(".box").show();
    
    autoPlayingSequence();
    startingGame = true;
  }
});

// generating automatic playing pattern sequence so that it will look like computer is pressing button itself while playhing game
function autoPlayingSequence() {
  userPlayingPattern = [];
  level++;

  $(".heading").text("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4); // Corrected this line
  var autoColorPicker = colors[randomNumber];

  autoPlayingPattern.push(autoColorPicker);
  
  pressingAnimation(autoColorPicker);
  playSound(autoColorPicker);
}

// letting user to choose which button is pressed
$(".box").click(function () {
  var userColorPicker = $(this).attr("id");
  userPlayingPattern.push(userColorPicker);

  pressingAnimation(userColorPicker);
  playSound(userColorPicker);

  checkingAnswer(userPlayingPattern.length - 1);
});

// Checking the answer, does the sequence match with the automatic generated sequence and the user clicked sequence
function checkingAnswer(range) {
  if (autoPlayingPattern[range] === userPlayingPattern[range]) {
    if (autoPlayingPattern.length === userPlayingPattern.length) {
      setTimeout(() => {
        
        autoPlayingSequence();

      }, 1000);
    }
    } else {
        // $(".heading").text("Game over mother Fucker, Press A Key to Restart the Game");
        $(".heading").text("Click me to Restart the game");
       
        $(".main-container").addClass("backgroundImage");
        $(".box").hide();
        playSound("wrong");

        level = 0;
        autoPlayingPattern = [];
        startingGame = false;
    }
  }

// making a function for Pressing Animation
function pressingAnimation(autoColorPicker) {
  $("#" + autoColorPicker).addClass("pressed");
  setTimeout(function () {
    $("#" + autoColorPicker).removeClass("pressed");
  }, 100);
}

// making a function for playing sound, so that it will be easier to add sound every time
function playSound(sound) {
  var soundName = new Audio("./sounds/" + sound + ".mp3");
  soundName.play();
}
