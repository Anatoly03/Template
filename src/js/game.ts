
export default class Game {
	// Canvas
	private canvas: HTMLCanvasElement;
	private ctx: CanvasRenderingContext2D;

	// FPS
	private fps: number;
	private lastCalledTime: number;

	// Variables
	public width: number;
	public height: number;

	// This is called once before the game loads.
	public setup(): void {
		this.canvas = <HTMLCanvasElement>document.getElementById('canvas');
		this.canvas.width = window.innerWidth;
		this.canvas.height = window.innerHeight;
		this.ctx = this.canvas.getContext("2d");
		this.ctx.imageSmoothingEnabled = false;

		// Event Listeners

		document.addEventListener('mouseover', event => {
			//
		});

		document.addEventListener('click', event => {
			//
		});

		document.addEventListener('keydown', event => {
			//
		});

		document.addEventListener("keyup", event => {
			//
		});
	}


	// This is called at best 60 times every second
	// Use this function for updating variables
	public update(): void {
		this.canvas.width = window.innerWidth;
		this.canvas.height = window.innerHeight;
		this.ctx = this.canvas.getContext("2d");

		// FPS
		if (!this.lastCalledTime) {
			this.lastCalledTime = Date.now();
			this.fps = 0;
			return;
		}
		let delta = (Date.now() - this.lastCalledTime) / 1000;
		this.lastCalledTime = Date.now();
		this.fps = 1 / delta;

		// Variables
		this.width = this.canvas.width;
		this.height = this.canvas.height;
	}

	// This is called at best 60 times every second
	// Use this function for drawing
	public render(): void {
		// Background
		this.ctx.fillStyle = "black";
		this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

		// Draw everything here

		this.ctx.fillStyle = "white";
		this.ctx.font = "35px Arial Rounded MT Bold";
		let t:string = `FPS: ${Math.floor(this.fps)}`;
		this.ctx.fillText(t, (this.width - this.ctx.measureText(t).width)*.5, this.height*.5)
	}
}