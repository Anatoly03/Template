
export default class Block {
    private ctx: CanvasRenderingContext2D;
    
    public id: number;
    
    constructor() {
        this.id = 0;
    }

    public update(): void {}

    public render(canvas: HTMLCanvasElement, x: number, y:number): void {
        let ctx = canvas.getContext("2d");

        if (this.id == 1) {
            let k = ctx.createLinearGradient(40 * x, 40 * y, 40 * (x+1), 40 * (y+1))
            k.addColorStop(0, "#2f2f2f");
            k.addColorStop(1, "#0f0f0f");
            ctx.fillStyle = k;
            ctx.fillRect(40 * x, 40 * y, 40, 40);

            // For control
            ctx.beginPath();
            ctx.arc(40 * x, 40 * y, 5, 0, 2 * Math.PI);
            ctx.fillStyle = "red";
            ctx.fill();
        }
        else {
            ctx.beginPath();
            ctx.arc(40 * x, 40 * y, 5, 0, 2 * Math.PI);
            ctx.fillStyle = "#1f0000";
            ctx.fill();
        }
    }
    
    // GET Methods

    get isSolid(): boolean {
        return this.id != 0;
    }
}