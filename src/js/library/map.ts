import Block from "./blocks";

export default class Map {
    public blocks: Block[][] = [];
    public width: number;
    public height: number;
    public gravity: number;

    constructor() {
        /*this.width = 1;
        this.height = 1;
        this.blocks = [[new Block()]];*/
    }

    public update(): void { }

    public render(canvas: HTMLCanvasElement): void {
        for (let i: number = 0; i < this.width; i++)
            for (let j: number = 0; j < this.height; j++)
                this.blocks[i][j].render(canvas, i, j);
    }
}