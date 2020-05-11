declare var require: any;
require('../css/main.css');

import Game from './game';

class App {
	private game: Game;

	constructor() {
		this.game = new Game();
	}

	public setup(): void {
		// Any setup that is required that only runs once before game loads goes here
		this.game.setup();
		this.gameLoop();
	}

	private gameLoop(): void {
		requestAnimationFrame(this.gameLoop.bind(this));

		this.game.update();
		this.game.render();
	}
}

window.onload = () => {
	let app = new App();

	app.setup();
}