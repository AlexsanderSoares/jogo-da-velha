import { Match } from "../../../domain/entities/Match";
import { UpdateMatchRepository } from "../../repositories/UpdateMatchRepository";

type Play = {
    playerNumber: number;
    line: number;
    column: number;
};

export type IUpdateMatchProps = {
    dateMatch?: Date;
    winner?: number | null;
    plays?: Array<Play> | null;
    start?: boolean;
    numberPlayers?: number;
};

export class UpdateMatchUseCase{
    constructor(
        private updateMatchRepository: UpdateMatchRepository
    ){}

    async execute(id: string, props: IUpdateMatchProps): Promise<Match>{

        const match = await this.updateMatchRepository.findMatch(id);

        if(match.numberPlayers >= 2)
            throw new Error('Esta partida está cheia');

        if(match.start)
            throw new Error('Esta partida já está em andamento');

        if(match.winner)
            throw new Error('Esta partida já foi finalizada');

        const newMatch = Match.create({start: props.start ?? match.start, winner: props.winner ?? match.winner, plays: props.plays ?? match.plays, numberPlayers: props.numberPlayers ?? match.numberPlayers,});
    
        const matchUpdate = this.updateMatchRepository.update(id, newMatch);

        return matchUpdate;

    }
}