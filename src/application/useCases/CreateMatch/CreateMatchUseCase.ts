import { Match } from "../../../domain/entities/Match";
import { CreateMatchRepository } from "../../repositories/CreateMatchRepository";

export class CreateMatchUseCase{

    constructor(
        private createMatchRepository: CreateMatchRepository,
    ){}

    async execute(player1): Promise<string>{

        const match = Match.create({start: false, winner: null, moves: null, player1, player_turn: player1});

        await this.createMatchRepository.save(match);

        const lastMatchId = await this.createMatchRepository.findLastMatchId();

        return lastMatchId;
    }
}