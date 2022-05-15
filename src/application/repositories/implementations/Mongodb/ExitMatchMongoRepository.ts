import { Match, Player } from "../../../../domain/entities/Match";
import { ExitMatchRepository } from "../../ExitMatchRepository";
import { MatchModel } from "./models/MatchModel";

export class ExitMatchMongoRepository implements ExitMatchRepository{
    async findMatchByPlayerId(socketPlayerId: string): Promise<Match> {
        const match = await MatchModel.findOne({
            $and: [
                {start: true},
                {$or: [{'player1.socket_id': socketPlayerId}, {'player2.socket_id': socketPlayerId}]}
            ],
        });

        return match;
    }

    async exitPlayerAndFinishMatch(matchId: string, player: Player): Promise<Match> {
        const match = await MatchModel.findByIdAndUpdate(matchId, {start: false, winner: player,}, {returnDocument: 'after'});

        return match;
    }
}