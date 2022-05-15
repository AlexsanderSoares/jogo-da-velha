import { Match, Move, Player } from "../../../domain/entities/Match";
import { UpdateMatchRepository } from "../../repositories/UpdateMatchRepository";

export type IUpdateMatchProps = {
    dateMatch?: Date;
    winner?: Player | null;
    moves?: Array<Move> | null;
    start?: boolean;
    player1?: Player;
    player2?: Player;
};

export class UpdateMatchUseCase{
    constructor(
        private updateMatchRepository: UpdateMatchRepository
    ){}

    async execute(id: string, props: IUpdateMatchProps): Promise<Match>{

        const match = await this.updateMatchRepository.findMatch(id);

        if(match.player1 && match.player2)
            throw new Error('Esta partida está cheia');

        if(match.start)
            throw new Error('Esta partida já está em andamento');

        if(match.winner)
            throw new Error('Esta partida já foi finalizada');

        const newMatch = Match.create({start: props.start ?? match.start, winner: props.winner ?? match.winner, moves: props.moves ?? match.moves, player1: props.player1 ?? match.player1, player2: props.player2 ?? match.player2,});
    
        const matchUpdate = this.updateMatchRepository.update(id, newMatch);

        return matchUpdate;

    }
}