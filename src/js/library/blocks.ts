const blocksMap = 'assets/terrain.png';

export default class Block {
    public id: number;
    private img: HTMLImageElement;
    
    constructor() {
        this.id = 0;
        this.img = new Image();
        this.img.src = blocksMap;
    }

    public update(): void {}

    public render(canvas: HTMLCanvasElement, x: number, y:number): void {
        let ctx = canvas.getContext("2d");

        if (this.id == 1) {
            ctx.drawImage(this.img, 36 * x, 36 * y, 36, 36);
        }
    }
    
    // GETter Methods

    get isSolid(): boolean {
        return this.id != 0;
    }

    get minimapPixel(): string {
        if (this.isSolid) return "red";
        return "black";
    }
}