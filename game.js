document.addEventListener("DOMContentLoaded", () => {
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");
  
    var chickenX = 300;
    var chickenY = 200;
    var appleX = Math.floor(Math.random() * ((canvas.width - 50) / 50 + 1)) * 50;
    var appleY = Math.floor(Math.random() * ((canvas.height - 50) / 50 + 1)) * 50;
    var fireX = Math.floor(Math.random() * ((canvas.width - 50) / 50 + 1)) * 50;
    var fireY = Math.floor(Math.random() * ((canvas.height - 50) / 50 + 1)) * 50;
  
    document.addEventListener("keydown", move, false);
  
    var rightPressed = false;
    var leftPressed = false;
    var upPressed = false;
    var downPressed = false;

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
          if (chickenX < canvas.width - 50) { //This to prevent chicken from going out the canvas
            chickenX += 50;
          } else {
            death();
          }
        }
        if (leftPressed) {
          if (chickenX > 0) { //This to prevent chicken from going out the canvas
            chickenX -= 50;
          } else {
            death();
          }
        }
        if (upPressed) {
          if (chickenY > 0) { //This to prevent chicken from going out the canvas
            chickenY -= 50;
          } else {
            death();
          }
        }
        if (downPressed) {
          if (chickenY < canvas.height - 50) { //This to prevent chicken from going out the canvas
            chickenY += 50;
          } else {
            death();
          }
        }
        chickenAppleCollisionCheck();
        chickenFireCollisionCheck();
        var img = document.getElementById("chicken-image");
        ctx.drawImage(img, chickenX, chickenY, 50, 50);
      }

      function drawApple() {
        var appleImg = document.getElementById("apple-image");
        ctx.drawImage(appleImg, appleX, appleY, 50, 50);
      }

      function drawFire() {
        var fireImg = document.getElementById("fire-image");
        ctx.drawImage(fireImg, fireX, fireY, 50, 50);
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

      function death() {
        alert("Game over")
        rightPressed = false;
        leftPressed = false;
        upPressed = false;
        downPressed = false;
        reset()
      }

      function chickenAppleCollisionCheck() {//Checking if coordinates of chicken and apple are overlapping
        if (appleX == chickenX && appleY == chickenY) {//&& = And
          appleX = Math.floor(Math.random() * ((canvas.width - 50) / 50 + 1)) * 50;
          appleY = Math.floor(Math.random() * ((canvas.height - 50) / 50 + 1)) * 50;
        }
      }

      function chickenFireCollisionCheck() {//Checking if coordinates of chicken and apple are overlapping
        if (fireX == chickenX && fireY == chickenY) {//&& = And
          death();
        }
      }
    
      setInterval(draw, 500);
      setInterval(move, 300);
    });
    


    // To Do
    // Find one more minecraft image the chicken can eat
    // Find an enemy that doesn't move for chicken
    // Find an enemy that moves for the chicken
    // Add fire to screen randomly every time apple gets eaten
    // Reset when die
    // Deploy this