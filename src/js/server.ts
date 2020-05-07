
class ServerPlayer {
    public id: number;
    //public gid: string;
    public x: number;
    public y: number;

    // Movement Controls
    public isHoldingLeft: boolean;
    public isHoldingRight: boolean;
    public isHoldingUp: boolean;
    public isHoldingDown: boolean;

    // Firing Controls
    public isAttackingLeft: boolean;
    public isAttackingUp: boolean;
    public isAttackingRight: boolean;
    public isAttackingDown: boolean;

    constructor(id: number, x: number, y: number) {
        this.id = id;
        this.x = x;
        this.y = y;

        this.isHoldingLeft = false;
        this.isHoldingRight = false;
        this.isHoldingUp = false;
        this.isHoldingDown = false;

        this.isAttackingLeft = false;
        this.isAttackingUp = false;
        this.isAttackingRight = false;
        this.isAttackingDown = false;
    }
}

export default class Connection {
    public callback: (type: number, obj?: any) => void = function (type: number, obj?: any): void { };
    public players: ServerPlayer[] = [
        new ServerPlayer(0, 7, 5),
        new ServerPlayer(1, 20, 15),
        new ServerPlayer(2, 35, 10)
    ];

    public send(type: number, obj?: any): void {
        switch (type) {
            /*
             * void
             * 
             * -> Init/ GameConnect
             *
             * [0]:  number    = Your player id
             * [1]:  number    = Map width
             * [2]:  number    = Map height
             * [3]:  Block[][] = World
             * [4]:  number    = Players count
             * [5]:  Player[]  = Players
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

                this.callback(0, [0, width, height, blocks, this.players.length, this.players]);
                break;

            /*
             * [0]:  number    = Direction 0-3
             * [1]:  boolean   = Key holding?
             * [2]:  number    = X Position
             * [3]:  number    = Y Position
             *
             * -> Movement
             * 
             * [0]:  number    = Your player id
             * [1]:  number    = Direction 0-3
             * [2]:  boolean   = Key holding?
             * [3]:  number    = X Position
             * [4]:  number    = Y Position
             */
            case 1:
                this.players[0].x = obj[2];
                this.players[0].y = obj[3];

                if (obj[0] == 0) this.players[0].isHoldingLeft = obj[1];
                else if (obj[0] == 1) this.players[0].isHoldingUp = obj[1];
                else if (obj[0] == 2) this.players[0].isHoldingRight = obj[1];
                else if (obj[0] == 3) this.players[0].isHoldingLeft = obj[1];
            
                this.callback(1, [0, obj[0], obj[1], obj[2], obj[3]]);
                break;

            /*
             * [0]:  number    = Direction 0-3
             * [1]:  boolean   = Key holding?
             *
             * -> Attack
             * Is called when a user attacks with WASD
             * 
             * [0]:  number    = Your player id
             * [1]:  number    = Direction 0-3
             * [2]:  boolean   = Key holding?
             */
            case 2:
                if (obj[0] == 0) this.players[0].isAttackingLeft = obj[1];
                else if (obj[0] == 1) this.players[0].isAttackingUp = obj[1];
                else if (obj[0] == 2) this.players[0].isAttackingRight = obj[1];
                else if (obj[0] == 3) this.players[0].isAttackingDown = obj[1];

                this.callback(1, [0, obj[0], obj[1], obj[2]]);
                break;
        }
    }
}