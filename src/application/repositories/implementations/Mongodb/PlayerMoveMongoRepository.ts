import { Match } from "../../../../domain/entities/Match";
import { PlayerMoveRepository } from "../../PlayerMoveRepository";
import { MatchModel } from "./models/MatchModel";

export class PlayerMoveMongoRepository implements PlayerMoveRepository{
    async findMatch(socket_id: string): Promise<Match> {
        return await MatchModel.findOne({
            $and: [
                {$or: [{'player1.socket_id': socket_id}, {'player2.socket_id': socket_id}]},
                {start: true},               
            ]
        });
    }

    async updateMatchWithPlayerMove(match: Match): Promise<Match> {
        return await MatchModel.findByIdAndUpdate({_id: match._id}, {...match}, {returnDocument: 'after'});
    }
}