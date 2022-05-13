import { Match } from "../../../../domain/entities/Match";
import { CreateMatchRepository } from "../../CreateMatchRepository";
import { MatchModel } from "./models/MatchModel";

export class MongoMatchRepository implements CreateMatchRepository{
    
    async findLastId(): Promise<string> {
        const lastId = MatchModel.findOne().sort({_id: -1});

        return lastId;
    }

    async save(match: Match): Promise<void> {
        await MatchModel.create({
            roomId: match.props.roomId,
            winner: match.props.winner,
            plays: match.props.plays,
        });
    }
}