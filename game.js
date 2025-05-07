document.addEventListener("DOMContentLoaded", () => {
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");
  
    var frogX = 325;
    var frogY = 225;
  
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
        var img = document.getElementById("chicken-image");
        ctx.drawImage(img, frogX, frogY, 50, 50);
      }
    
      function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    
        ctx.beginPath();
        drawChicken();
        ctx.closePath();
      }
    
      setInterval(draw, 500);
    });