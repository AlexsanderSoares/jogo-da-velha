import { Match } from "../../../domain/entities/Match";
import { CreateMatchRepository } from "../../repositories/CreateMatchRepository";

export class CreateMatchUseCase{

    constructor(
        private createMatchRepository: CreateMatchRepository,
    ){}

    async execute(): Promise<string>{

        const match = Match.create({start: false, winner: null, plays: null, numberPlayers: 1});

        await this.createMatchRepository.save(match);

        const lastMatchId = await this.createMatchRepository.findLastMatchId();

        return lastMatchId;
    }
}