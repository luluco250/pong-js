(function() {
	"use strict";

	class Paddle {
		constructor(game) {
			this.game = game;
		}

		draw() {
			const left = this.game.viewport2world(0, 0).x;
			const pos = new Common.Vector2(left + 50, game.mouse.y);
			this.game.draw_rect(pos, 50, 300, "#fff");
		}
	}

	const canvas = document.getElementById("game-canvas");
	let game = null;

	window.addEventListener("load", function() {
		game = new Game(canvas, {
			motion_blur: 0.9,
			background_color: new Common.Color(31, 63, 127)
		});
		game.objects = [
			new Paddle(game)
		];
		game.start();
	});
})();