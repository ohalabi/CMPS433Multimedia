let c = document.getElementById("MyCanvas");
let ctx = c.getContext("2d");

ctx.beginPath();//object 1
ctx.fillStyle = "green";
ctx.fillRect(20, 20, 150, 200);

ctx.beginPath(); // drawing object 2
ctx.rect(40, 40, 150, 200);
ctx.fillStyle = "blue";
ctx.fill();