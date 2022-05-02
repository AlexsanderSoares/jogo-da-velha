import { Entity } from "../../core/domain/Entity";

type Play = {
    playerNumber: number;
    line: number;
    column: number;
};

type MatchProps = {
    dateMatch?: Date;
    winner: number | null;
    plays: Array<Play> | null;
    roomId: string;
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