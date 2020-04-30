import Map from "./map";
import Block from "./blocks";

export default class Player {
    private ctx: CanvasRenderingContext2D;

    public x: number;
    public y: number;

    public xSpeed: number;
    public ySpeed: number;

    public xAcc: number;
    public yAcc: number;

    public xFriction: number;
    public yFriction: number;

    public xDefaultSpeed: number;
    public yDefaultSpeed: number;
    
    constructor() {
        this.x = 3;
        this.y = 3;

        this.xSpeed = 0;
        this.ySpeed = 0;

        this.xAcc = 0;
        this.yAcc = 0;

        this.xFriction = .2;
        this.yFriction = .0;

        this.xDefaultSpeed = 0;
        this.yDefaultSpeed = 0;
    }

    public update(map: Map): void {
        let obstacles: Block[][] = [];

        //for ()

        this.x += this.xSpeed;
        this.y += this.ySpeed;

        this.xSpeed += this.xAcc;
        this.ySpeed += this.yAcc;

        this.xSpeed += this.xSpeed > this.xDefaultSpeed ? - this.xFriction : this.xFriction;
        //this.xSpeed += this.xSpeed > this.xDefaultSpeed ? this.xSpeed == this.xDefaultSpeed ? - this.xFriction : 0 : this.xFriction;
        this.ySpeed += this.ySpeed > this.yDefaultSpeed ? - this.yFriction : this.yFriction;
    }

    public onKeyPressed(type: number, event: KeyboardEvent): void {
        if (type == 1) {
            switch(event.keyCode) {
                case 37:
                    this.xAcc = -.5;
                    break;
    
                case 38:
                    this.yAcc = -.05;
                    break;
    
                case 39:
                    this.xAcc = .5;
                    break;
    
                case 40:
                    this.yAcc = .05;
                    break;
            }
        }
        else if (type == 0) {
            switch(event.keyCode) {
                case 37:
                case 39:
                    this.xAcc = 0;
                    break;
    
                case 38:
                case 40:
                    this.yAcc = 0;
                    break;
            }
        }
    }

    public render(canvas: HTMLCanvasElement): void {
        let ctx = canvas.getContext("2d");

        ctx.fillStyle = "#3f3f3f";
        ctx.fillRect(40 * this.x, 40 * this.y, 40, 40)
	}
}