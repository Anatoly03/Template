

export default class Connection {
    public callback = function(type: number, obj?: any): void {};

    public send(type: number, obj?: any): void {
        switch (type) {
            /*
             * Init/ GameConnect
             *
             * [0]:  number    = Your player id
             * [1]:  number    = Map width
             * [2]:  number    = Map height
             * [3]:  Block[][] = World
             * [4]:  Player[]  = Players
             */
            case 0:

                // Map
                let blocks: number[][] = [];
                let width: number = 60;
                let height: number = 55;

                for (let i: number = 0; i < width; i++) {
                    blocks[i] = [];
                    for (let j: number = 0; j < height; j++) {
                        blocks[i][j] = 0;
                        if (j + Math.floor(i / 5) % 2 > 30) blocks[i][j] = 1;
                        if (j + Math.floor(i / 5) % 2 < 2) blocks[i][j] = 1;
                        if (j > 25 && i == 17) blocks[i][j] = 1;
                    }
                }

                this.callback(0, [0, width, height, blocks, []]);
                break;

            /*
             * Movement
             */
            case 1:

                break;

            // 2 ignored
        }
    }

    /*public eventHandler(type: number, obj?: any): void {
        switch (type) {
            /*
             * Init/ GameConnect
             * /
            case 0:

                break;

            /*
             * Movement
             * /
            case 1:

                break;

            /*
             * PlayerInit - is called on start after 
             * /
            case 2:

                break;
        }
    }*/
}