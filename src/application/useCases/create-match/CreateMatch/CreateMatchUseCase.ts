import { Match } from "../../../../domain/entities/Match";
import { CreateMatchRepository } from "../../../repositories/CreateMatchRepository";

export class CreateMatch{

    constructor(
        private createMatchRepository: CreateMatchRepository,
    ){}

    async execute(roomId: string){
        const match = Match.create({roomId, winner: null, plays: null});

        await this.createMatchRepository.save(match);
    }
}