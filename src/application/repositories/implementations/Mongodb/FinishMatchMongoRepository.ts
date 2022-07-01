import { Match, Player } from "../../../../domain/entities/Match";
import { FinishMatchRepository } from "../../FinishMatchRepository";
import { MatchModel } from "./models/MatchModel";

export class FinishMatchMongoRepository implements FinishMatchRepository{
    async findMatchById(matchId: string): Promise<Match> {
        return await MatchModel.findById(matchId);
    }

    async finishMatch(matchId: string, winner: Player): Promise<Match> {
        return await MatchModel.findByIdAndUpdate(matchId, {start: false, winner}, {returnDocument: 'after'});
    }
}