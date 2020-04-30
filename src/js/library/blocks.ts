
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
            ctx.fillStyle = "#2f2f2f";
            ctx.fillRect(40 * x, 40 * y, 40, 40)
        }
    }
    
    // GET Methods

    get isSolid(): boolean {
        return this.id != 0;
    }
}