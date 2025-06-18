document.addEventListener("DOMContentLoaded", () => {
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");
    
    var gameStart = false;

    var chickenCoordinates = {
      x: 300,
      y: 200,
    };
    var appleCoordinates = {
      x: 0,
      y: 0,
    };
    
    var fireCoordinates = [];
    appleCoordinates = spawnNewCoordinates();

    var foxCoordinates = {
      x: 400,
      y: 400,
    };
  
    document.addEventListener("keydown", move, false);
  
    var chickenDirection = "left";
    var foxDirection = "left";
    var animatedFireFrame = 1;
    var rightPressed = false;
    var leftPressed = false;
    var upPressed = false;
    var downPressed = false;

    //Get the existing high score from local storage
    //To access anything from local storage I need to pass in the key to get the value
    if (localStorage.getItem("high-score")) {
      document.getElementById("highscore").innerHTML = "highscore : " + localStorage.getItem("high-score");
    }
    var score = 0;

    function move(event) {
      if (event) {
        gameStart = true;
        if (event.code == "ArrowRight") {
          rightPressed = true;
          leftPressed = false;
          upPressed = false;
          downPressed = false;
          chickenDirection = "right";
        } else if (event.code == "ArrowLeft") {
          leftPressed = true;
          rightPressed = false;
          upPressed = false;
          downPressed = false;
          chickenDirection = "left";
        } else if (event.code == "ArrowDown") {
          downPressed = true;
          leftPressed = false;
          rightPressed = false;
          upPressed = false;
        } else if (event.code == "ArrowUp") {
          upPressed = true;
          leftPressed = false;
          rightPressed = false;
          downPressed = false;
        }
      }
    }
    function drawChicken() {
      // if (rightPressed) {
      //   if (chickenCoordinates.x < canvas.width - 50) { //This to prevent chicken from going out the canvas
      //     chickenCoordinates.x += 50;
      //   } else {
      //     death();
      //   }
      // }
      // if (leftPressed) {
      //   if (chickenCoordinates.x > 0) { //This to prevent chicken from going out the canvas
      //     chickenCoordinates.x -= 50;
      //   } else {
      //     death();
      //   }
      // }
      // if (upPressed) {
      //   if (chickenCoordinates.y > 0) { //This to prevent chicken from going out the canvas
      //     chickenCoordinates.y -= 50;
      //   } else {
      //     death();
      //   }
      // }
      // if (downPressed) {
      //   if (chickenCoordinates.y < canvas.height - 50) { //This to prevent chicken from going out the canvas
      //     chickenCoordinates.y += 50;
      //   } else {
      //     death();
      //   }
      // }
      chickenAppleCollisionCheck();
      chickenFireCollisionCheck();
      chickenFoxCollisionCheck();
      var img = document.getElementById("chicken-" + chickenDirection + "-image");
      ctx.drawImage(img, chickenCoordinates.x, chickenCoordinates.y, 50, 50);
    }
      function updateChickenLocation() {
        if (rightPressed) {
          if (chickenCoordinates.x < canvas.width - 50) { //This to prevent chicken from going out the canvas
            chickenCoordinates.x += 50;
          } else {
            death();
          }
        }
        if (leftPressed) {
          if (chickenCoordinates.x > 0) { //This to prevent chicken from going out the canvas
            chickenCoordinates.x -= 50;
          } else {
            death();
          }
        }
        if (upPressed) {
          if (chickenCoordinates.y > 0) { //This to prevent chicken from going out the canvas
            chickenCoordinates.y -= 50;
          } else {
            death();
          }
        }
        if (downPressed) {
          if (chickenCoordinates.y < canvas.height - 50) { //This to prevent chicken from going out the canvas
            chickenCoordinates.y += 50;
          } else {
            death();
          }
        }
      }

      var foxSpeedDirection = "up"

      function updateFoxLocation() {
        if (gameStart) {
          var diffX = chickenCoordinates.x - foxCoordinates.x;
          var diffY = chickenCoordinates.y - foxCoordinates.y;
          var absDiffX = Math.abs(diffX);
          var absDiffY = Math.abs(diffY);
          if (absDiffX > absDiffY) {
            if (diffX > 0) {
              foxCoordinates.x += 50;
            } else {
              foxCoordinates.x -= 50;
            }
          } else {
            if (diffY > 0) {
              foxCoordinates.y += 50;
            } else {
              foxCoordinates.y -= 50;
            }
          }
        }
        // if (foxCoordinates.x >= canvas.width - 50) {
        //   foxSpeedDirection = "down"          
        // } else if (foxCoordinates.x <= 50) {
        //   foxSpeedDirection = "up"          
        // } else if (foxCoordinates.y >= canvas.height - 50) {
        //   foxSpeedDirection = "left"          
        // } else if (foxCoordinates.y <= 50) {
        //   foxSpeedDirection = "right"          
        // }
        // if (foxSpeedDirection == "up") {
        //   foxCoordinates.y -= 50;
        // } else if (foxSpeedDirection == "down") {
        //   foxCoordinates.y += 50;
        // } else if (foxSpeedDirection == "left") {
        //   foxCoordinates.x -= 50;
        // } else if (foxSpeedDirection == "right") {
        //   foxCoordinates.x += 50;
        // }
      }

      function drawApple() {
        var appleImg = document.getElementById("apple-image");
        ctx.drawImage(appleImg, appleCoordinates.x, appleCoordinates.y, 50, 50);
      }

      function drawFire() {
        animatedFireFrame += 1;
        if (animatedFireFrame > 4) {
          animatedFireFrame = 1;
        }
        var fireImg = document.getElementById("fire-frame-" + animatedFireFrame);
        for (let i = 0; i < fireCoordinates.length; i++) {
          ctx.drawImage(fireImg, fireCoordinates[i].x, fireCoordinates[i].y, 50, 50);
        }   
      }

      function drawFox() {
        if (foxCoordinates.x > chickenCoordinates.x) {
          foxDirection = "left"
        } else {
          foxDirection = "right"
        }
        var foxImg = document.getElementById("fox-" + foxDirection + "-image");
        ctx.drawImage(foxImg, foxCoordinates.x, foxCoordinates.y, 50, 50);
      }

      function drawBackground() {
        var img = document.getElementById("game-background");
        ctx.drawImage(img, 0, 0, 700, 500);
      }

      function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.beginPath();
        drawBackground();
        ctx.closePath();
        ctx.beginPath();
        drawChicken();
        ctx.closePath();
        ctx.beginPath();
        drawApple();
        ctx.closePath();
        ctx.beginPath();
        drawFire();
        ctx.closePath();
        ctx.beginPath();
        drawFox();
        ctx.closePath();
      }

      function spawnNewCoordinates() { //Creates new coordinates, makes sure it doesn't overlap with anything on the grass
        var newX = 0;
        var newY = 0;

        while (true) { //Keeps repeating this until there are no coordinates that overlap
          newX = Math.floor(Math.random() * ((canvas.width - 50) / 50 + 1)) * 50; //Picking a new X location
          newY = Math.floor(Math.random() * ((canvas.height - 50) / 50 + 1)) * 50; //Picking a new Y location

          if (newX != chickenCoordinates.x && newY != chickenCoordinates.y && newX != appleCoordinates.x && newY != appleCoordinates.y) { //Checks if chicken and apple are overlapping
            var overlappingWithExistingCoordinates = false;

            for (let i = 0; i < fireCoordinates.length; i++) { //Loops through all fire coordinates and makes sure it doesn't overlap
              if (newX == fireCoordinates[i].x && newY == fireCoordinates[i].y) {
                overlappingWithExistingCoordinates = true; //If it overlaps set overlapping to true
              }
            }
            if (!overlappingWithExistingCoordinates) { //If doesn't overlap at all then return new coordinates
              return {
                x: newX,
                y: newY,
              }
            }
          }
        }
      }

      function death() {
        alert("Game over")
        gameStart = false;
        rightPressed = false;
        leftPressed = false;
        upPressed = false;
        downPressed = false;
        setHighScore();
        score = 0;
        document.getElementById("score").innerHTML = "score : " + score;
        fireCoordinates = [];
        foxCoordinates = spawnNewCoordinates()
      }

      function setHighScore() {
        //I need to create a if to check if the new score is higher than the old one
        if (score > localStorage.getItem("high-score")) {
          localStorage.setItem("high-score", score);
        }
          document.getElementById("highscore").innerHTML = "highscore : " + localStorage.getItem("high-score");
      }

      function createNewFire() {
        var newFireCoordinates = spawnNewCoordinates();
        fireCoordinates.push(newFireCoordinates);
      }

      function chickenAppleCollisionCheck() {//Checking if coordinates of chicken and apple are overlapping
        if (appleCoordinates.x == chickenCoordinates.x && appleCoordinates.y == chickenCoordinates.y) {//&& = And
          appleCoordinates = spawnNewCoordinates();
          score++;
          document.getElementById("score").innerHTML="score : " + score;
          createNewFire();
        }
      }

      function chickenFireCollisionCheck() {//Checking if coordinates of chicken and apple are overlapping
        for (let i = 0; i < fireCoordinates.length; i++) {
          if (fireCoordinates[i].x == chickenCoordinates.x && fireCoordinates[i].y == chickenCoordinates.y) {//&& = And
            death();
          }
        }
      }

      function chickenFoxCollisionCheck() {
        if (foxCoordinates.x == chickenCoordinates.x && foxCoordinates.y == chickenCoordinates.y) {
          death()
        }
      }

      
      var chickenSpeedSlider = document.getElementById("chicken-speed-slider");
      chickenSpeedSlider.onchange = function() {
        document.getElementById("chicken-speed-title").innerHTML = "Chicken speed: " + this.value;
        clearInterval(chickenSpeed);
        if (this.value == 1) {
          chickenSpeed = setInterval(updateChickenLocation, 500);
        }
        else if (this.value == 2) {
          chickenSpeed = setInterval(updateChickenLocation, 400);
        }
        else if (this.value == 3) {
          chickenSpeed = setInterval(updateChickenLocation, 300);
        }
        else if (this.value == 4) {
          chickenSpeed = setInterval(updateChickenLocation, 200);
        }
        else {
          chickenSpeed = setInterval(updateChickenLocation, 100);
        }
      }


      var chickenSpeed = setInterval(updateChickenLocation, 300); //The number here is milliseconds, the lower the number is the faster the chicken is
      var foxSpeed = setInterval(updateFoxLocation, 600);
      setInterval(draw, 100);
      setInterval(move, 100);
    });
    


    // To Do
    // Find one more minecraft image the chicken can eat
    // Find an enemy that doesn't move for chicken
    // Find an enemy that moves for the chicken
    // Add fire to screen randomly every time apple gets eaten
    // Reset when die
    // Deploy this
    // Change speed of fox