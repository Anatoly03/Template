const blocksMap = 'assets/terrain.png';

export default class Block {
    public id: number;
    private img: HTMLImageElement;
    public minimapPixel: string;
    
    constructor() {
        this.id = 0;
        this.img = new Image();
        this.img.src = blocksMap;

        this.minimapPixel = "black";
    }

    public update(): void {}

    public render(canvas: HTMLCanvasElement, x: number, y:number): void {
        let ctx = canvas.getContext("2d");

        if (this.id == 1) {
            ctx.drawImage(this.img, 36 * x, 36 * y, 36, 36);

            /*debug stuff: red block dots
            
            //For control
            ctx.beginPath();
            ctx.arc(36 * x, 36 * y, 5, 0, 2 * Math.PI);
            ctx.fillStyle = "red";
            ctx.fill();
        }
        else {
            ctx.beginPath();
            ctx.arc(36 * x, 36 * y, 5, 0, 2 * Math.PI);
            ctx.fillStyle = "#1f0000";
            ctx.fill();*/
        }
    }
    
    // GET Methods

    get isSolid(): boolean {
        return this.id != 0;
    }
}