import { Match } from "../../../../domain/entities/Match";
import { IUpdateMatchProps } from "../../../useCases/UpdateMatch/UpdateMatchUseCase";
import { UpdateMatchRepository } from "../../UpdateMatchRepository";
import { MatchModel } from "./models/MatchModel";

export class UpdateMatchMongoRepository implements UpdateMatchRepository{
    
    async findMatch(id: string): Promise<IUpdateMatchProps> {
        const match = await MatchModel.findById(id);

        return match;
    }

    async update(id: string, match: Match): Promise<Match> {
        const matchUpdate = await MatchModel.findByIdAndUpdate({_id: id}, {...match.props});

        return matchUpdate;
    }

}