import Map from "./map";
//import Block from "./blocks";

export default class Player {
    // Position
    public x: number;
    public y: number;

    // Speed
    public xSpeed: number;
    public ySpeed: number;

    // Acceleration
    public xAcc: number;
    public yAcc: number;

    // Movement Controls
    public isHoldingLeft: boolean;
    public isHoldingRight: boolean;
    public isHoldingUp: boolean;
    public isHoldingDown: boolean;

    // Controls
    public isBlockBelow: boolean;
    public isBlockAbove: boolean;
    public isBlockToRight: boolean;
    public isBlockToLeft: boolean;

    constructor() {
        this.x = 7;
        this.y = 5;

        this.xSpeed = 0;
        this.ySpeed = 0;

        this.xAcc = 0;
        this.yAcc = 0;

        this.isHoldingLeft = false;
        this.isHoldingRight = false;
        this.isHoldingUp = false;
        this.isHoldingDown = false;

        this.isBlockBelow = false;
        this.isBlockAbove = false;
        this.isBlockToRight = false;
        this.isBlockToLeft = false;
    }

    public updateBlockCollision(map: Map): void {
        let px: number = Math.round(this.x);
        let py: number = Math.round(this.y);
        //console.log('px=', px, ', py=', py, ', xSpeed=', this.xSpeed, ', ySpeed=', this.ySpeed);

        this.isBlockBelow = false;
        this.isBlockAbove = false;
        this.isBlockToRight = false;
        this.isBlockToLeft = false;

        for (let x: number = px - 1; x < px + 2; x++) {
            for (let y: number = py - 1; y < py + 2; y++) {
                if (x >= 0 && y >= 0 && x < map.width && y < map.height) {
                    if (map.blocks[x][y].isSolid) {
                        // Block - From Top collision
                        if (this.ySpeed > 0 && Math.abs(this.x - x) < 1 && y > py) {
                            if (this.y > y - 1) {
                                this.ySpeed = Math.min(0, this.ySpeed);
                                this.y = Math.min(this.y, y - 1);
                                this.isBlockBelow = true;
                            }
                        }
                        // Block - From Bottom collision
                        else if (this.ySpeed < 0 && Math.abs(this.x - x) < 1 && y < py) {
                            if (this.y < y + 1) {
                                this.ySpeed = Math.max(0, this.ySpeed);
                                this.y = Math.max(this.y, y + 1);
                                this.isBlockAbove = true;
                            }
                        }

                        // Block - From Left collision
                        if (this.xSpeed > 0 && Math.abs(this.y - y) < 1 && x > px) {
                            if (this.x > x - 1) {
                                this.xSpeed = Math.min(0, this.xSpeed);
                                this.x = Math.min(this.x, x - 1);
                                this.isBlockToRight = true;
                            }
                        }
                        // Block - From Right collision
                        else if (this.xSpeed < 0 && Math.abs(this.y - y) < 1 && x < px) {
                            if (this.x < x + 1) {
                                this.xSpeed = Math.max(0, this.xSpeed);
                                this.x = Math.max(this.x, x + 1);
                                this.isBlockToLeft = true;
                            }
                        }
                    }
                }
            }
        }

        //console.log(this.isBlockBelow);
    }

    public update(map: Map): void {
        if (this.isHoldingUp && this.isBlockBelow)
            this.yAcc = -.3;

        if (this.isHoldingLeft)
            this.xAcc = -.005;
        else if (this.isHoldingRight)
            this.xAcc = .005;

        // Update speed
        this.xSpeed += this.xAcc;
        this.ySpeed += this.yAcc;

        // Maximal Speed
        if (this.ySpeed > .5)
            this.ySpeed = .5;
        else if (this.ySpeed < -.5)
            this.ySpeed = -.5;
        if (this.xSpeed > .5)
            this.xSpeed = .5;
        else if (this.xSpeed < -.5)
            this.xSpeed = -.5;

        // Gravity when in air
        this.xAcc = 0;
        if (!this.isBlockBelow)
            this.yAcc = .01;
        else
            this.yAcc = 0;

        // Friction on ground
        if (this.isBlockBelow && !(this.isHoldingRight || this.isHoldingLeft))
            this.xSpeed *= .3;
        else if (this.isBlockBelow && this.isHoldingDown)
            this.xSpeed *= .9;

        // Update position
        this.x += this.xSpeed;
        this.y += this.ySpeed;

        // No need for too precise values
        if (this.xSpeed < Math.pow(10, -5) && this.xSpeed > -Math.pow(10, -5))
            this.xSpeed = 0;
        if (this.ySpeed < Math.pow(10, -5) && this.ySpeed > -Math.pow(10, -5))
            this.ySpeed = 0;

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

    public render(canvas: HTMLCanvasElement): void {
        let ctx = canvas.getContext("2d");

        //ctx.fillStyle = "#3f3f3f";
        //ctx.fillRect(40 * this.x, 40 * this.y, 40, 40)

        ctx.beginPath();
        ctx.arc(36 * (this.x + .5), 36 * (this.y + .5), 18, 0, 2 * Math.PI, false);
        ctx.fillStyle = "#3f3f3f";
        ctx.fill();
        ctx.strokeStyle = "#5f5f5f";
        ctx.stroke();

        /*debug stuff
        
        ctx.beginPath();
        ctx.arc(36 * this.x, 36 * this.y, 5, 0, 2 * Math.PI);
        ctx.fillStyle = "blue";
        ctx.fill();*/
    }
}