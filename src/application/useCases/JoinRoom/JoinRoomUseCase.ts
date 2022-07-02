import { Match, Move, Player } from "../../../domain/entities/Match";
import { JoinRoomRepository } from "../../repositories/JoinRoomRepository";

export type IJoinRoomProps = {
    _id?: string;
    dateMatch?: Date;
    winner?: Player | null;
    moves?: Array<Move> | null;
    board?: Array<Array<string>>;
    player_turn?: Player;
    start?: boolean;
    player1?: Player;
    player2?: Player;
};

export class JoinRoomUseCase{
    constructor(
        private updateMatchRepository: JoinRoomRepository
    ){}

    async execute(id: string, props: IJoinRoomProps): Promise<Match>{

        const match = await this.updateMatchRepository.findMatch(id);

        if(!match)
            throw new Error("Sala não encontrada");

        if(match.player1 && match.player2)
            throw new Error('Esta partida está cheia');

        if(match.start)
            throw new Error('Esta partida já está em andamento');

        if(match.winner)
            throw new Error('Esta partida já foi finalizada');

        const newMatch = Match.create({start: props.start ?? match.start, 
                                        winner: props.winner ?? match.winner, 
                                        moves: props.moves ?? match.moves, 
                                        player1: props.player1 ?? match.player1, 
                                        player2: props.player2 ?? match.player2,
                                        player_turn: props.player_turn ?? match.player_turn,
                                        board: props.board ?? match.board
                                    });
    
        const matchUpdate = this.updateMatchRepository.join(id, newMatch);

        return matchUpdate;

    }
}