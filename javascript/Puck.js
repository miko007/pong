var Puck = function(x, y, r) {
	this.x    = x || width / 2;
	this.y    = y || height / 2;
	this.r    = r || height * 0.03;
	this.xVel = Game.Velocity;
	this.yVel = random(-3,3);
	this.coll = true;
};
Puck.prototype.draw = function() {
	this.x -= this.xVel;
	this.y -= this.yVel;


	Game.Players.forEach(function(player) {
		if (player.collideCircle(this)) {
			if (!this.coll)
				return;
			var abs = (this.y + this.r - player.y) / (player.height + this.r);
			var delta = 0.25 * Math.PI * (2 * abs - 1);
			this.xVel = -this.xVel;
			this.yVel = Game.Velocity * Math.sin(delta);
			Game.Sounds.hit.play();
			this.coll = false;
			setTimeout(this.resetCollision.bind(this), 100);
		}
	}.bind(this));

	switch (this.outOfScope()) {
		case Puck.BORDER:
			this.yVel = -this.yVel;
			Game.Sounds.hit.play();
			break;
		case Puck.WALL_RIGHT:
			delete Game.Puck;
			setTimeout(Puck.reset, 1000);
			Game.Players[0].score++;
			Game.Sounds.goal.play();
			//Game.Velocity += Game.Velocity / Math.abs(Game.Velocity);
			break;
		case Puck.WALL_LEFT:
			delete Game.Puck;
			setTimeout(Puck.reset, 1000);
			Game.Players[1].score++;
			Game.Sounds.goal.play();
			//Game.Velocity += Game.Velocity / Math.abs(Game.Velocity);
			break;
	}

	fill(Game.Color);
	ellipse(this.x, this.y, this.r, this.r);
};
Puck.prototype.outOfScope = function() {
	if (this.x <= -this.r)
		return Puck.WALL_LEFT;
	if (this.x >= (width + this.r))
		return Puck.WALL_RIGHT;
	else if (this.y <= 0 || this.y >= (height - this.r))
		return Puck.BORDER;
};
Puck.reset = function() {
	Game.Velocity *= -1;
	delete Game.Puck;
	Game.Puck = new Puck(width / 2, height / 2);
	//loop();
};
Puck.prototype.resetCollision = function() {
	this.coll = true;
};
Puck.BORDER     = 0;
Puck.WALL_LEFT  = 1;
Puck.WALL_RIGHT = 2;
