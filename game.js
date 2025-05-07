document.addEventListener("DOMContentLoaded", () => {
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");

    var rightPressed = false;
    var leftPressed = false;
    var upPressed = false;
    var downPressed = false;

    var chickenX = 50;
    var chickenY = 200;

    document.addEventListener("keydown", move, false);
    function move(event) {

        if (event.key == "ArrowRight") {
            rightPressed = true;
            leftPressed = false;
            upPressed = false;
            downPressed = false;
            console.log("Moving Right");
          } else if (event.key == "ArrowLeft") {
            rightPressed = false;
            leftPressed = true;
            upPressed = false;
            downPressed = false;
            console.log("Moving Left");
          } else if (event.key == "ArrowUp") {
            rightPressed = false;
            leftPressed = false;
            upPressed = true;
            downPressed = false;
            console.log("Moving Up");
          } else if (event.key == "ArrowDown") {
            rightPressed = false;
            leftPressed = false;
            upPressed = false;
            downPressed = true;
            console.log("Moving Down");
          }

    }

    function drawChicken() {
        var chicken = document.getElementById("chicken-image");
        ctx.drawImage(chicken, chickenX, chickenY, 50, 50);
        console.log(drawChicken)
    }

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.beginPath();
        drawChicken();
        ctx.closePath();
    }

    setInterval(draw, 500);

});