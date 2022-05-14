import { Entity } from "../../core/domain/Entity";

type Player = {
    name: String;
    socket_id: String;
};

type Move = {
    player: Player;
    line: number;
    column: number;
};

type MatchProps = {
    dateMatch?: Date;
    winner: number | null;
    moves: Array<Move> | null;
    start: boolean;
    player1: Player;
    player2?: Player;
};

export class Match extends Entity<MatchProps>{
    private constructor(props: MatchProps, id?: string){
        super(props, id);
    }

    static create(props: MatchProps, id?: string){
        const match = new Match({
            ...props, 
            dateMatch: props.dateMatch ?? new Date(),
        }, id);

        return match;
    }
}