import Block from "./blocks";

export default class Map {
    private blocks: Block[][];
    private width: number;
    private height: number;

    constructor() {
        this.blocks = [];
        this.width = 40;
        this.height = 20;

        for (let i: number = 0; i < this.width; i++)
        {
            this.blocks[i] = [];
            for (let j: number = 0; j < this.height; j++)
            {
                this.blocks[i][j] = new Block();
                if (j + Math.floor(i/5)%2 > 10) this.blocks[i][j].id = 1;
            }
        }
    }

    public update(): void {}

    public render(canvas: HTMLCanvasElement): void {
        //let ctx = canvas.getContext("2d");

        for (let i: number = 0; i < this.width; i++)
            for (let j: number = 0; j < this.height; j++)
                this.blocks[i][j].render(canvas, i, j);
	}
}