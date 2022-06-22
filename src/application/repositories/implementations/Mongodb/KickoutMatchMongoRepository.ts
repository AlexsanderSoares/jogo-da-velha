import { Match } from "../../../../domain/entities/Match";
import { KickoutMatchRepository } from "../../KickoutMatchRepository";
import { MatchModel } from "./models/MatchModel";

export class KickoutMatchMongoRepository implements KickoutMatchRepository{

    async findMatchByPlayerId(socketPlayerId: string): Promise<Match> {
        return await MatchModel.findOne({
            'player1.socket_id': socketPlayerId
        });    
    }

    async kickoutMatchPlayer(match: Match): Promise<Match> {
        const newMatch = match;
        newMatch.player2 = null;
        return await MatchModel.findByIdAndUpdate(match._id, newMatch);
    }
}