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
        //console.log('px=', px, ', py=', py, ', xSpeed=', this.xSpeed, ', ySpeed=', this.ySpeed);

        for (let x: number = px - 1; x < px + 2; x++) {
            for (let y: number = py - 1; y < py + 2; y++) {
                if (x >= 0 && y >= 0 && x < map.width && y < map.height) {
                    if (map.blocks[x][y].isSolid) {
                        // Block - Top collision
                        if (this.ySpeed >= 0 && Math.abs(this.x - x) < 1 && y > py) {
                            if (this.y - y > -1) {
                                this.ySpeed = 0;
                                this.y = Math.min(this.y, y - 1)
                            }
                        }
                        // Block - Bottom collision
                        else if (this.ySpeed <= 0 && Math.abs(this.x - x) < 1 && y < py) {
                            if (this.y - y < 1) {
                                this.ySpeed = 0;
                                this.y = Math.max(this.y, y + 1)
                            }
                        }

                        // Block - Left collision
                        if (this.xSpeed >= 0 && Math.abs(this.y - y) < 1 && x > px) {
                            if (this.x - x > -1) {
                                this.xSpeed = 0;
                                this.x = Math.min(this.x, x - 1)
                            }
                        }
                        // Block - Bottom collision
                        else if (this.xSpeed <= 0 && Math.abs(this.y - y) < 1 && x < px) {
                            if (this.x - x < 1) {
                                this.xSpeed = 0;
                                this.x = Math.max(this.x, x + 1)
                            }
                        }
                    }
                }
            }
        }
    }

    public update(map: Map): void {
        // Update position, speed, etc.
        this.x += this.xSpeed;
        this.y += this.ySpeed;

        this.xSpeed = this.xAcc;
        this.ySpeed = this.yAcc;

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
        if (type == 1) { // BUTTON PRESSED
            switch (event.keyCode) {
                case 37: // LEFT
                    this.xAcc = -.05;
                    break;

                case 38: // UP
                    this.yAcc = -.05;
                    break;

                case 39: // RIGHT
                    this.xAcc = .05;
                    break;

                case 40: // DOWN
                    this.yAcc = .05;
                    break;
            }
        }
        else if (type == 0) { // BUTTON RELEASED
            switch (event.keyCode) {
                case 37: // LEFT
                case 39: // RIGHT
                    this.xAcc = 0;
                    break;

                case 38: // UP
                case 40: // DOWN
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