import Map from "./map";
import Block from "./blocks";

export default class Player {
    public x: number;
    public y: number;

    public xSpeed: number;
    public ySpeed: number;

    public xAcc: number;
    public yAcc: number;

    private isHoldingLeft: boolean;
    private isHoldingRight: boolean;
    private isHoldingUp: boolean;
    private isHoldingDown: boolean;

    private holdingLetters: string[] = [];

    public isBlockBelow: boolean;

    constructor() {
        this.x = 3;
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
    }

    public updateBlockCollision(map: Map): void {
        let px: number = Math.round(this.x);
        let py: number = Math.round(this.y);
        //console.log('px=', px, ', py=', py, ', xSpeed=', this.xSpeed, ', ySpeed=', this.ySpeed);

        this.isBlockBelow = false;

        for (let x: number = px - 1; x < px + 2; x++) {
            for (let y: number = py - 1; y < py + 2; y++) {
                if (x >= 0 && y >= 0 && x < map.width && y < map.height) {
                    if (map.blocks[x][y].isSolid) {
                        // Block - Top collision
                        if (this.ySpeed >= 0 && Math.abs(this.x - x) < 1 && y > py) {
                            if (this.y > y - 1) {
                                this.ySpeed = 0;
                                this.y = Math.min(this.y, y - 1);
                                this.isBlockBelow = true;
                            }
                        }
                        // Block - Bottom collision
                        else if (this.ySpeed <= 0 && Math.abs(this.x - x) < 1 && y < py) {
                            if (this.y < y + 1) {
                                this.ySpeed = 0;
                                this.y = Math.max(this.y, y + 1)
                            }
                        }

                        // Block - Left collision
                        if (this.xSpeed >= 0 && Math.abs(this.y - y) < 1 && x > px) {
                            if (this.x > x - 1) {
                                this.xSpeed = 0;
                                this.x = Math.min(this.x, x - 1)
                            }
                        }
                        // Block - Bottom collision
                        else if (this.xSpeed <= 0 && Math.abs(this.y - y) < 1 && x < px) {
                            if (this.x < x + 1) {
                                this.xSpeed = 0;
                                this.x = Math.max(this.x, x + 1)
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

        // Update
        this.x += this.xSpeed;
        this.y += this.ySpeed;

        this.xSpeed += this.xAcc;
        this.ySpeed += this.yAcc;

        this.xAcc = 0;
        if (!this.isBlockBelow)
            this.yAcc = .01;
        else
            this.yAcc = 0;

        if (this.isBlockBelow && this.isHoldingDown)
            this.xSpeed *= .9;

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
        /*
        Type 1: Button pressed
        Type 0: Button released
        */
        switch (event.keyCode) {
            case 37: // Left
                this.isHoldingLeft = type == 1;
                break;

            case 38: // Up
                this.isHoldingUp = type == 1;
                break;

            case 39: // Right
                this.isHoldingRight = type == 1;
                break;

            case 40: // Down
                this.isHoldingDown = type == 1;
                break;

            /*case 87: // W
            case 97: // A
            case 83: // S
            case 68: // D*/
            default:
                if (type == 1) {
                    if (this.holdingLetters.indexOf(event.key, 0) < 0)
                        this.holdingLetters.push(event.key);
                }
                else {
                    let index = this.holdingLetters.indexOf(event.key, 0);
                    if (index > -1) {
                        this.holdingLetters.splice(index, 1);
                    }
                }
                console.log(this.holdingLetters);
                break;
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

    // Methods

    public isHolding (letter: string): boolean {
        return this.holdingLetters.indexOf(letter, 0) < 0
    }
}