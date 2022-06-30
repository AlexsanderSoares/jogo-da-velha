import { Match } from "../../../domain/entities/Match";
import { CreateMatchRepository } from "../../repositories/CreateMatchRepository";

export class CreateMatchUseCase{

    constructor(
        private createMatchRepository: CreateMatchRepository,
    ){}

    async execute(player1): Promise<Match>{

        const match = Match.create({start: false, winner: null, moves: null, player1, player_turn: player1, board: new Array(new Array<string>(3), new Array<string>(3), new Array<string>(3))});

        return await this.createMatchRepository.save(match);

    }
}