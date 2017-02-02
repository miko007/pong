function preload() {
	Game.Sounds = {
		hit : loadSound("sounds/hit.mp3"),
		goal: loadSound("sounds/goal.mp3")
	};
	Game.Fonts = {
		main: loadFont("fonts/c64.ttf")
	}
}

function setup() {
	Game.Color  = color(0, 255, 0, 130);
	Game.Canvas = createCanvas(600, 400);
	Game.Puck   = new Puck();
	Game.Players.push(new Player(0, height / 2));
	Game.Players.push(new Player(width - Game.Players[0].width, height / 2));
}

function draw() {
	var wobble  = 10 * sin((1 / 4) *frameCount);
	var wobble2 = height * sin((1 / 300) *frameCount);
	var wobble3 =  sin(3 * frameCount);
	translate(wobble3, wobble3);
	noSmooth();
	background(0);
	Game.Started = true;
	fill(Game.Color);
	textFont(Game.Fonts.main);
	textSize(height * 0.15);
	text(Game.Players[0].score, width * 0.25 - (textWidth(Game.Players[0].score.toString()) / 2), height * .2);
	text(Game.Players[1].score, width * 0.75 - (textWidth(Game.Players[1].score.toString()) / 2), height * .2);

	stroke(Game.Color);
	noFill();
	strokeWeight(3.5);
	line(width / 2, 0, width / 2, height);
	ellipse(width / 2, height / 2, height * 0.5, height * 0.5);

	if (Game.Puck) {
		if (Game.Players[1].y + (Game.Players[1].height / 2) >= Game.Puck.y)
			Game.Players[1].move(Player.UP);
		if ((Game.Players[1].y + Game.Players[1].height / 2) < Game.Puck.y)
			Game.Players[1].move(Player.DOWN);
		Game.Puck.draw();
	}

	if (keyIsDown(87))
		Game.Players[0].move(Player.UP);
	else if (keyIsDown(83))
		Game.Players[0].move(Player.DOWN);

	Game.Players.forEach(function(player) {
		player.draw();
	});
	fill(255,255,255,3);
	for (var n = 0; n <= height; n += 10) {
		rect(0, n + wobble, width, 5);
	}
	rect(0, wobble2, width, height * 0.1);
	fill(0, 0, 0, 20);
	for (var n = 5; n <= height; n += 10) {
		rect(0, n + wobble, width, 5);
	}
}

