import { Match } from "../../../../domain/entities/Match";
import { CreateMatchRepository } from "../../CreateMatchRepository";
import { MatchModel } from "./models/MatchModel";

export class MongoMatchRepository implements CreateMatchRepository{
    
    async findLastMatchId(): Promise<string> {
        const lastMatchId = await MatchModel.findOne().sort({_id: -1});

        return lastMatchId._id;
    }

    async save(match: Match): Promise<void> {
        await MatchModel.create({
            start: match.props.start,
            winner: match.props.winner,
            plays: match.props.plays,
            numberPlayers: match.props.numberPlayers,
        });
    }

}