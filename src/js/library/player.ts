import Map from "./map";
import Block from "./blocks";

export default class Player {
    private ctx: CanvasRenderingContext2D;

    public x: number;
    public y: number;

    public xSpeed: number;
    public ySpeed: number;

    //public maxSpeed: number = 1;

    public xAcc: number;
    public yAcc: number;

    constructor() {
        this.x = 3;
        this.y = 5;

        this.xSpeed = 0;
        this.ySpeed = 0;

        this.xAcc = 0;
        this.yAcc = 0;
    }

    public updateBlockCollision(map: Map): void {
        let px: number = Math.round(this.x);
        let py: number = Math.round(this.y);

        for (let x: number = px - 1; x < px + 2; x++)
            for (let y: number = py - 1; y < py + 2; y++)
                if (x >= 0 && y >= 0 && x < map.width && y < map.height)
                    if (map.blocks[x][y].isSolid && Math.pow(this.x - x, 2)) {
                        
                    }
    }

    public updateValue(): void {
        // Basics

        this.x += this.xSpeed;
        this.y += this.ySpeed;

        this.xSpeed += this.xAcc;
        this.ySpeed += this.yAcc;

        //this.xSpeed += this.xSpeed > this.xDefaultSpeed ? - this.xFriction : this.xFriction;
        //this.xSpeed += this.xSpeed > this.xDefaultSpeed ? this.xSpeed == this.xDefaultSpeed ? - this.xFriction : 0 : this.xFriction;
        this.ySpeed += this.ySpeed > 1 ? - .01 : .01;
    }

    public update(map: Map): void {
        // Update values
        this.updateValue()

        // Update physics to blocks around
        this.updateBlockCollision(map);

        // You cannot leave the border

        if (this.x < 0) {
            this.x = 0;
            this.xSpeed = 0;
        }
        else if (this.x > map.width - 1) {
            this.x = map.width - 1;
            this.xSpeed = 0;
        }

        if (this.y < 0) {
            this.y = 0;
            this.ySpeed = 0;
        }
        else if (this.y > map.height - 1) {
            this.y = map.height - 1;
            this.ySpeed = 0;
        }
    }

    public onKeyPressed(type: number, event: KeyboardEvent): void {
        if (type == 1) {
            switch (event.keyCode) {
                case 37:
                    this.xAcc = -.01;
                    break;

                case 38:
                    this.yAcc = -.05;
                    break;

                case 39:
                    this.xAcc = .01;
                    break;

                case 40:
                    this.yAcc = .05;
                    break;
            }
        }
        else if (type == 0) {
            switch (event.keyCode) {
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

        //ctx.fillStyle = "#3f3f3f";
        //ctx.fillRect(40 * this.x, 40 * this.y, 40, 40)

        ctx.beginPath();
        ctx.arc(40 * (this.x + .5), 40 * (this.y + .5), 20, 0, 2 * Math.PI, false);
        ctx.fillStyle = "#3f3f3f";
        ctx.fill();
        ctx.strokeStyle = "#5f5f5f";
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(40 * this.x, 40 * this.y, 5, 0, 2 * Math.PI);
        ctx.fillStyle = "blue";
        ctx.fill();
    }
}