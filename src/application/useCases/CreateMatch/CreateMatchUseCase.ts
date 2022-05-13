import { Match } from "../../../domain/entities/Match";
import { CreateMatchRepository } from "../../repositories/CreateMatchRepository";

export class CreateMatchUseCase{

    constructor(
        private createMatchRepository: CreateMatchRepository,
    ){}

    async execute(){

        const roomId = await this.createMatchRepository.findLastId();

        const match = Match.create({roomId, winner: null, plays: null});

        await this.createMatchRepository.save(match);
    }
}