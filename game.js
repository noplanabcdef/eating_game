document.addEventListener("DOMContentLoaded", () => {
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");
  
    var chickenCoordinates = {
      x: 300,
      y: 200,
    };
    var appleCoordinates = {
      x: 0,
      y: 0,
    };
    // appleCoordinates = spawnNewCoordinates()
    // var fireCoordinates = {
    //   x: Math.floor(Math.random() * ((canvas.width - 50) / 50 + 1)) * 50,
    //   y: Math.floor(Math.random() * ((canvas.height - 50) / 50 + 1)) * 50,
    // };
    var fireCoordinates = []
  
    document.addEventListener("keydown", move, false);
  
    var rightPressed = false;
    var leftPressed = false;
    var upPressed = false;
    var downPressed = false;
    var score = 0;

    function move(event) {
        console.log(event);
    
        if (event.code == "ArrowRight") {
          rightPressed = true;
          leftPressed = false;
          upPressed = false;
          downPressed = false;
        } else if (event.code == "ArrowLeft") {
          leftPressed = true;
          rightPressed = false;
          upPressed = false;
          downPressed = false;
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
      function drawChicken() {
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
        chickenAppleCollisionCheck();
        chickenFireCollisionCheck();
        var img = document.getElementById("chicken-image");
        ctx.drawImage(img, chickenCoordinates.x, chickenCoordinates.y, 50, 50);
      }

      function drawApple() {
        var appleImg = document.getElementById("apple-image");
        ctx.drawImage(appleImg, appleCoordinates.x, appleCoordinates.y, 50, 50);
      }

      function drawFire() {
        var fireImg = document.getElementById("fire-image");
        ctx.drawImage(fireImg, fireCoordinates.x, fireCoordinates.y, 50, 50);
      }
    
      function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.beginPath();
        drawChicken();
        ctx.closePath();
        ctx.beginPath();
        drawApple();
        ctx.closePath();
        ctx.beginPath();
        drawFire();
        ctx.closePath();
      }
      
      function spawnNewCoordinates() {
        var newX = 0;
        var newY = 0;

        while (true) {
          newX = Math.floor(Math.random() * ((canvas.width - 50) / 50 + 1)) * 50;
          newY = Math.floor(Math.random() * ((canvas.height - 50) / 50 + 1)) * 50;

          if (newX != chickenCoordinates.x && newY != chickenCoordinates.y && newX != appleCoordinates.x && newY != appleCoordinates.y) {
            var overlappingWithExistingCoordinates = false;

            for (let i = 0; i < fireCoordinates.length; i++) {
              if (newX == fireCoordinates[i].x && newY == fireCoordinates[i].y) {
                overlappingWithExistingCoordinates = true;
              }
            }
            if (!overlappingWithExistingCoordinates) {
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
        rightPressed = false;
        leftPressed = false;
        upPressed = false;
        downPressed = false;
<<<<<<< Updated upstream
        reset()
=======
        score = 0;
>>>>>>> Stashed changes
      }

      function chickenAppleCollisionCheck() {//Checking if coordinates of chicken and apple are overlapping
        if (appleCoordinates.x == chickenCoordinates.x && appleCoordinates.y == chickenCoordinates.y) {//&& = And
          appleCoordinates = spawnNewCoordinates()
          score++;
          document.getElementById("score").innerHTML="score : " + score;
        }
      }

      function chickenFireCollisionCheck() {//Checking if coordinates of chicken and apple are overlapping
        if (fireCoordinates.x == chickenCoordinates.x && fireCoordinates.y == chickenCoordinates.y) {//&& = And
          death();
        }
      }
    
      setInterval(draw, 150);
      setInterval(move, 150);
    });
    


    // To Do
    // Find one more minecraft image the chicken can eat
    // Find an enemy that doesn't move for chicken
    // Find an enemy that moves for the chicken
    // Add fire to screen randomly every time apple gets eaten
    // Reset when die
    // Deploy this