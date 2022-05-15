
export type Player = {
    name: String;
    socket_id: String;
    disconnected?: Boolean;
};

export type Move = {
    player: Player;
    line: number;
    column: number;
};

type MatchProps = {
    _id?: string;
    dateMatch?: Date;
    winner: Player | null;
    moves: Array<Move> | null;
    start: boolean;
    player1: Player;
    player2?: Player;
};

export class Match{

    public _id?: string
    public dateMatch?: Date
    public winner: Player | null
    public moves: Array<Move> | null
    public start: boolean
    public player1: Player
    public player2?: Player

    private constructor(
        props: { 
        _id?: string,
        dateMatch?: Date,
        winner: Player | null,
        moves: Array<Move> | null,
        start: boolean,
        player1: Player,
        player2?: Player,
    }){
        
        Object.assign(this, props);
    }

    static create(props: MatchProps){
        const match = new Match({
            ...props, 
            dateMatch: props.dateMatch ?? new Date(),
        });

        return match;
    }
}