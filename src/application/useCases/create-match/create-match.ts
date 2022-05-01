import { Match } from "../../../domain/entities/Match";
import { MatchRepository } from "../../repositories/MatchRepository";

export class CreateMatch{

    constructor(
        private matchRepository: MatchRepository,
    ){}

    async execute(roomId: string){
        const match = Match.create({
            roomId,
            winner: null,
            plays: null,
        });

        return match;
    }
}