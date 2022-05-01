import { Entity } from "../../core/domain/Entity";

type Play = {
    playerNumber: number;
    line: number;
    column: number;
};

type MatchProps = {
    date: Date;
    winner: string;
    plays: Array<Play>;
};

export class Match extends Entity<MatchProps>{
    private constructor(props: MatchProps, id?: string){
        super(props, id);
    }

    static create(props: MatchProps, id?: string){
        const match = new Match(props, id);

        return match;
    }
}