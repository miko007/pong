var Player = function (x, y, w, h) {
	this.x      = x || 0;
	this.y      = y || 0;
	this.width  = w || width * 0.02;
	this.height = h || height * 0.2;
	this.score  = 0;
};
Player.prototype.draw = function () {
	noStroke();
	fill(Game.Color);
	rect(this.x, this.y, this.width, this.height);
};
Player.prototype.move = function (direction) {
	switch (direction) {
		case Player.UP:
			if (this.y <= 0)
				return;
			this.y -= Math.abs(Game.Velocity / 2);
			break;
		case Player.DOWN:
			if (this.y >= (height - this.height))
				return;
			this.y += Math.abs(Game.Velocity / 2);
			break;
	}
};
Player.prototype.collideCircle = function (circle) {
	var distanceX = Math.abs(circle.x - this.x - this.width / 2);
	var distanceY = Math.abs(circle.y - this.y - this.height / 2);

	if (distanceX >= (this.width / 2 + circle.r)) {
		return false;
	}
	if (distanceY >= (this.height / 2 + circle.r)) {
		return false;
	}

	if (distanceX < (this.width / 2)) {
		return true;
	}
	if (distanceY < (this.height / 2)) {
		return true;
	}
	var dx = distanceX - this.width / 2;
	var dy = distanceY - this.height / 2;
	return (dx * dx + dy * dy <= (circle.r * circle.r));
};
Player.UP = 0;
Player.DOWN = 1;
