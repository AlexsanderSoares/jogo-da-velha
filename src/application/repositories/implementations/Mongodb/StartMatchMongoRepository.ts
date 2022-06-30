import { Match } from "../../../../domain/entities/Match";
import { StartMatchRepository } from "../../StartMatchRepository";
import { MatchModel } from "./models/MatchModel";

export class StartMatchMongoRepository implements StartMatchRepository{
    async findMatchByPlayerId(socketId: string): Promise<Match> {
        return await MatchModel.findOne({
                'player1.socket_id': socketId
        });
    }

    async startMatch(matchId: string): Promise<Match> {
        return await MatchModel.findByIdAndUpdate(matchId, {start: true}, {returnDocument: 'after'});
    }
}