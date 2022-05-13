import { Match } from "../../../domain/entities/Match";
import { CreateMatchRepository } from "../../repositories/CreateMatchRepository";

export class CreateMatchUseCase{

    constructor(
        private createMatchRepository: CreateMatchRepository,
    ){}

    async execute(): Promise<string>{

        const match = Match.create({winner: null, plays: null});

        const createMatch = await this.createMatchRepository.save(match);

        console.log(createMatch);

        return "roomId";
    }
}