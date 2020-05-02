import Map from "./library/map";
import Player from "./library/player";

export default class Game {
	private canvas: HTMLCanvasElement;
	private ctx: CanvasRenderingContext2D;

	/*
	Block Map
	*/
	private map: Map;

	/*
	Players - contains player object
	you - which player is client controlled
	*/
	private players: Player[];
	private you: number;

	/*
	Keyboard-pressed buttons
	*/
	private holdingLetters: string[] = [];

	/*
	Game configurations
	*/
	private isMinimapShowing: boolean = true;

	/*
	Constructor Game()

	Updates the current game screen elements
	*/
	constructor() {
		this.canvas = <HTMLCanvasElement>document.getElementById('canvas');
		this.canvas.width = window.innerWidth;
		this.canvas.height = window.innerHeight;
		this.ctx = this.canvas.getContext("2d");

		this.map = new Map();

		this.players = [new Player()];
		this.you = 0;

		/*document.addEventListener('mouseover', function(event) {
			alert('ho');
		});
		
		document.addEventListener('click', function(event) {
			alert('ho');
		});*/

		document.addEventListener('keydown', event => {
			if (this.holdingLetters.indexOf(event.key.toLowerCase(), 0) < 0) {
				this.holdingLetters.push(event.key.toLowerCase());
				this.onKeyTouchBegan(event.key.toLowerCase());
			}
		});

		document.addEventListener("keyup", event => {
			let index = this.holdingLetters.indexOf(event.key.toLowerCase(), 0);
			if (index > -1) {
				this.holdingLetters.splice(index, 1);
				this.onKeyTouchEnded(event.key.toLowerCase());
			}
		});
	}

	/*
	Method render()

	Updates the current game screen elements
	*/
	public update(): void {
		this.canvas.width = window.innerWidth;
		this.canvas.height = window.innerHeight;
		this.ctx = this.canvas.getContext("2d");

		this.map.update();
		this.players.forEach(element => element.update(this.map));
	}

	/*
	Method render()

	Draws the current game screen elements
	*/
	public render(): void {
		let controlledPlayer = this.players[this.you];

		// Background
		this.ctx.fillStyle = "black";
		this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

		//#region GameScreen
		let cameraX = this.canvas.width * .5 - 40 * controlledPlayer.x
		let cameraY = this.canvas.height * .5 - 40 * controlledPlayer.y
		this.ctx.translate(cameraX, cameraY);

		this.map.render(this.canvas);
		this.players.forEach(element => element.render(this.canvas));

		/*debug stuff: 3x3 rect around person
		
		let px: number = Math.round(controlledPlayer.x);
		let py: number = Math.round(controlledPlayer.y);

		this.ctx.strokeStyle = "red";
		this.ctx.strokeRect(36 * (px - 1), 36 * (py - 1), 36 * 3, 36 * 3);*/

		this.ctx.translate(-cameraX, -cameraY);
		//#endregion GameScreen

		//#region Minimap
		if (this.isMinimapShowing) {
			// Border
			this.ctx.strokeStyle = "#efefef";
			this.ctx.strokeRect(this.canvas.width - this.map.width - 21, this.canvas.height - this.map.height - 57, this.map.width + 2, this.map.height + 2);

			// Pixels
			for (let i: number = 0; i < this.map.width; i++)
				for (let j: number = 0; j < this.map.height; j++) {
					this.ctx.fillStyle = this.map.blocks[i][j].minimapPixel;
					this.ctx.fillRect(this.canvas.width - this.map.width + i - 20, this.canvas.height - this.map.height + j - 56, 1, 1);
				}

			// People
			this.players.forEach(p => {
				this.ctx.fillStyle = "white";
				this.ctx.fillRect(this.canvas.width - this.map.width + Math.round(p.x) - 20, this.canvas.height - this.map.height + Math.round(p.y) - 56, 1, 1);
			});
		}
		//#endregion Minimap

		//#region BottomControlBar
		this.ctx.fillStyle = "#1f1f1f";
		this.ctx.fillRect(0, this.canvas.height - 36, this.canvas.width, 36);

		for (let i: number = 0; i < 11; i++) {
			this.ctx.fillStyle = "#2f2f2f";
			this.ctx.fillRect(this.canvas.width*.5 + 55 * i, this.canvas.height - 50, 50, 50);
		}
		//#endregion BottomControlBar
	}

	/*
	Method onKeyTouchBegan()

	Called when the user pressed a key.
	*/
	private onKeyTouchBegan(key: string): void {
		switch (key) {
			case "arrowleft":
				this.players[this.you].isHoldingLeft = true;
				break;

			case "arrowup":
				this.players[this.you].isHoldingUp = true;
				break;

			case "arrowright":
				this.players[this.you].isHoldingRight = true;
				break;

			case "arrowdown":
				this.players[this.you].isHoldingDown = true;
				break;
		}
	}

	/*
	Method onKeyTouchEnded()

	Called when the user pressed a key.
	*/
	private onKeyTouchEnded(key: string): void {
		switch (key) {
			case "arrowleft":
				this.players[this.you].isHoldingLeft = false;
				break;

			case "arrowup":
				this.players[this.you].isHoldingUp = false;
				break;

			case "arrowright":
				this.players[this.you].isHoldingRight = false;
				break;

			case "arrowdown":
				this.players[this.you].isHoldingDown = false;
				break;

			case "e":
				break;

			case "w":
				break;

			case "m":
				this.isMinimapShowing = !this.isMinimapShowing;
				break;
		}
	}
}