import Map from "./library/map";
import Player from "./library/player";

export default class Game {
	private canvas: HTMLCanvasElement;
	private ctx: CanvasRenderingContext2D;

	private map: Map;
	private players: Player[];

	constructor() {
		this.canvas = <HTMLCanvasElement>document.getElementById('canvas');
		this.canvas.width = window.innerWidth;
		this.canvas.height = window.innerHeight;
		this.ctx = this.canvas.getContext("2d");

		this.map = new Map();
		this.players = [new Player()];
		let controlledPlayer = this.players[0];

		/*document.addEventListener('click', function(event) {
			alert('ho');
		});*/

		document.addEventListener('keydown', event => {
			controlledPlayer.onKeyPressed(1, event);
		});

		document.addEventListener("keyup", event => {
			controlledPlayer.onKeyPressed(0, event);
		});
	}

	public update(): void {
		this.canvas.width = window.innerWidth;
		this.canvas.height = window.innerHeight;
		this.ctx = this.canvas.getContext("2d");

		this.map.update();
		this.players.forEach(element => element.update(this.map));
	}	

	public render(): void {
		// Background
		this.ctx.fillStyle = "black";
		this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

		this.map.render(this.canvas);
		this.players.forEach(element => element.render(this.canvas));
	}
}