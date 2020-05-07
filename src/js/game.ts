import Map from "./library/map";
import Player from "./library/player";
import Connection from "./server";
import Block from "./library/blocks";

export default class Game {
	private canvas: HTMLCanvasElement;
	private ctx: CanvasRenderingContext2D;
	private fps: number;
	private lastCalledTime: number;

	/*
	Client - gives a connection to the server
	*/
	private con: Connection = new Connection();

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
	private isInfoShowing: boolean = true;
	private selectedItem: number = 1;

	/*
	Constructor Game()

	Updates the current game screen elements
	*/
	constructor() {
		this.canvas = <HTMLCanvasElement>document.getElementById('canvas');
		this.canvas.width = window.innerWidth;
		this.canvas.height = window.innerHeight;
		this.ctx = this.canvas.getContext("2d");
		this.ctx.imageSmoothingEnabled = false;

		// Client setup
		// WARNING! Doing this.client.callback = this.event; sets the reference to Connection, so the code does not work.
		this.con.callback = (type: number, obj?: any) => {this.event(type, obj)};
		this.con.send(0);

		// Event Listeners

		document.addEventListener('mouseover', function(event) {
			//
		});
		
		document.addEventListener('click', function(event) {
			//
		});

		document.addEventListener('keydown', event => {
			if (this.holdingLetters.indexOf(event.key.toLowerCase(), 0) < 0) {
				this.holdingLetters.push(event.key.toLowerCase());
				console.log(this.holdingLetters);
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
	Method event()

	Updates the current game screen elements
	*/
	public event(type: number, obj?: any): void {
		//console.log(type, obj);

		switch (type) {
			case 0:
				// 0: Your player id (in the world)
				this.you = obj[0];
				
				// 1: Width
				// 2: Height
				// 3: Blocks Map
				this.map = new Map();
				this.map.width = obj[1];
				this.map.height = obj[2];
				this.map.blocks = [];

				for (let i: number = 0; i < obj[1]; i++) {
					this.map.blocks[i] = [];
					for (let j: number = 0; j < obj[2]; j++) {
						this.map.blocks[i][j] = new Block();
						this.map.blocks[i][j].id = obj[3][i][j];
					}
				}

				// 4: Amount of players
				// 5: Players
				this.players = [];
				for (let i: number = 0; i < obj[4]; i++) {
					this.players[i] = new Player();
					this.players[i].x = obj[5][i].x;
					this.players[i].y = obj[5][i].y;
				}

				break;
		}
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
		// The current fps
		if (!this.lastCalledTime) {
			this.lastCalledTime = Date.now();
			this.fps = 0;
			return;
		}
		let delta = (Date.now() - this.lastCalledTime) / 1000;
		this.lastCalledTime = Date.now();
		this.fps = 1 / delta;

		// The player you control
		let controlledPlayer = this.players[this.you];

		// Background
		this.ctx.fillStyle = "black";
		this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

		//#region GameScreen
		let cameraX = this.canvas.width * .5 - 40 * controlledPlayer.x
		let cameraY = this.canvas.height * .5 - 40 * controlledPlayer.y
		this.ctx.translate(cameraX + 20, cameraY + 20);

		this.map.render(this.canvas);
		this.players.forEach(element => element.render(this.canvas));

		this.ctx.strokeStyle = "yellow";
		if (controlledPlayer.isAttackingLeft) {
			this.ctx.strokeRect(36 * controlledPlayer.x, 36 * (controlledPlayer.y - 4), 36, 36 * 3);
		}
		if (controlledPlayer.isAttackingUp) {
			this.ctx.strokeRect(36 * (controlledPlayer.x - 4), 36 * controlledPlayer.y, 36 * 3, 36);
		}
		if (controlledPlayer.isAttackingRight) {
			this.ctx.strokeRect(36 * controlledPlayer.x, 36 * (controlledPlayer.y + 2), 36, 36 * 3);
		}
		if (controlledPlayer.isAttackingDown) {
			this.ctx.strokeRect(36 * (controlledPlayer.x + 2), 36 * controlledPlayer.y, 36 * 3, 36);
		}


		this.ctx.translate(-cameraX -20, -cameraY -20);
		//#endregion GameScreen

		//#region Minimap
		if (this.isMinimapShowing) {
			// Border
			this.ctx.strokeStyle = "#efefef";
			this.ctx.strokeRect(this.canvas.width - this.map.width - 21, 16, this.map.width + 2, this.map.height + 2);

			// Pixels
			for (let i: number = 0; i < this.map.width; i++)
				for (let j: number = 0; j < this.map.height; j++) {
					this.ctx.fillStyle = this.map.blocks[i][j].minimapPixel;
					this.ctx.fillRect(this.canvas.width - this.map.width + i - 20, j + 17, 1, 1);
				}

			// People
			this.players.forEach(p => {
				this.ctx.fillStyle = "white";
				this.ctx.fillRect(this.canvas.width - this.map.width + Math.round(p.x) - 20, Math.round(p.y) + 17, 1, 1);
			});
		}
		//#endregion Minimap

		//#region BottomControlBar
		this.ctx.fillStyle = "#1f1f1f";
		this.ctx.fillRect(0, this.canvas.height - 36, this.canvas.width, 36);

		for (let i: number = 1; i < 10; i++) {
			this.ctx.fillStyle = "#2f2f2f";
			this.ctx.fillRect(this.canvas.width * .5 + 55 * (i - 5), this.canvas.height - 60, 50, 50);
			if (this.selectedItem == i) {
				this.ctx.strokeStyle = "#4f4f4f";
				this.ctx.lineWidth = 5;
				this.ctx.strokeRect(this.canvas.width * .5 + 55 * (i - 5) + 5, this.canvas.height - 55, 40, 40);
			}
		}
		//#endregion BottomControlBar

		//#region Information
		if (this.isInfoShowing) {
			let lines: string[] = [
				"FPS:" + this.fps.toPrecision(3),
				"X:" + controlledPlayer.x.toPrecision(5),
				"Y:" + controlledPlayer.y.toPrecision(5),
				"xSpeed:" + controlledPlayer.xSpeed/*.toPrecision(5)*/,
				"ySpeed:" + controlledPlayer.ySpeed/*.toPrecision(5)*/,
				"Blocks around: " + (controlledPlayer.isBlockToLeft ? "L " : "") + (controlledPlayer.isBlockAbove ? "T " : "") + (controlledPlayer.isBlockToRight ? "R " : "") + (controlledPlayer.isBlockBelow ? "B " : ""),
			];

			let i: number = 0;
			lines.forEach(line => {
				i++;
				this.ctx.fillStyle = "white";
				this.ctx.font = "15px Arial";
				this.ctx.fillText(line, 20, 15 * i + 20)
			});
		}
		//#endregion Information
	}

	/*
	Method onKeyTouchBegan()

	Called when the user pressed a key.
	*/
	private onKeyTouchBegan(key: string): void {
		let controlledPlayer = this.players[this.you];

		switch (key) {
			// Movement
			case "arrowleft":
				this.players[this.you].isHoldingLeft = true;
				this.con.send(1, [0, true, controlledPlayer.x, controlledPlayer.y]);
				break;
			case "arrowup":
				this.players[this.you].isHoldingUp = true;
				this.con.send(1, [1, true, controlledPlayer.x, controlledPlayer.y]);
				break;
			case "arrowright":
				this.players[this.you].isHoldingRight = true;
				this.con.send(1, [2, true, controlledPlayer.x, controlledPlayer.y]);
				break;
			case "arrowdown":
				this.players[this.you].isHoldingDown = true;
				this.con.send(1, [3, true, controlledPlayer.x, controlledPlayer.y]);
				break;

			// Attacking
			case "w":
				this.players[this.you].isAttackingLeft = true;
				this.con.send(2, [0, true]);
				break;
			case "a":
				this.players[this.you].isAttackingUp = true;
				this.con.send(2, [1, true]);
				break;
			case "s":
				this.players[this.you].isAttackingRight = true;
				this.con.send(2, [2, true]);
				break;
			case "d":
				this.players[this.you].isAttackingDown = true;
				this.con.send(2, [3, true]);
				break;

			// Inventory
			case "1":
			case "2":
			case "3":
			case "4":
			case "5":
			case "6":
			case "7":
			case "8":
			case "9":
				this.selectedItem = parseInt(key);
				break;
		}
	}

	/*
	Method onKeyTouchEnded()

	Called when the user pressed a key.
	*/
	private onKeyTouchEnded(key: string): void {
		let controlledPlayer = this.players[this.you];

		switch (key) {
			// Movement
			case "arrowleft":
				this.players[this.you].isHoldingLeft = false;
				this.con.send(1, [0, false, controlledPlayer.x, controlledPlayer.y]);
				break;
			case "arrowup":
				this.players[this.you].isHoldingUp = false;
				this.con.send(1, [1, false, controlledPlayer.x, controlledPlayer.y]);
				break;
			case "arrowright":
				this.players[this.you].isHoldingRight = false;
				this.con.send(1, [2, false, controlledPlayer.x, controlledPlayer.y]);
				break;
			case "arrowdown":
				this.players[this.you].isHoldingDown = false;
				this.con.send(1, [3, false, controlledPlayer.x, controlledPlayer.y]);
				break;

			// Attacking
			case "w":
				this.players[this.you].isAttackingLeft = false;
				this.con.send(2, [0, false]);
				break;
			case "a":
				this.players[this.you].isAttackingUp = false;
				this.con.send(2, [1, false]);
				break;
			case "s":
				this.players[this.you].isAttackingRight = false;
				this.con.send(2, [2, false]);
				break;
			case "d":
				this.players[this.you].isAttackingDown = false;
				this.con.send(2, [3, false]);
				break;

			// Inventory?
			case "e":
				break;

			// Minimap
			case "m":
				this.isMinimapShowing = !this.isMinimapShowing;
				break;

			// Information
			case "i":
				this.isInfoShowing = !this.isInfoShowing;
				break;
		}
	}
}