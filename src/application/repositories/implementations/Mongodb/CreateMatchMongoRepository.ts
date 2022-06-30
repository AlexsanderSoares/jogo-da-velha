import { Match } from "../../../../domain/entities/Match";
import { IUpdateMatchProps } from "../../../useCases/UpdateMatch/UpdateMatchUseCase";
import { CreateMatchRepository } from "../../CreateMatchRepository";
import { UpdateMatchRepository } from "../../UpdateMatchRepository";
import { MatchModel } from "./models/MatchModel";

export class CreateMatchMongoRepository implements CreateMatchRepository{
    
    async findLastMatchId(): Promise<string> {
        const lastMatchId = await MatchModel.findOne().sort({_id: -1});

        return lastMatchId._id;
    }

    async save(match: Match): Promise<Match> {
        return await MatchModel.create({
            start: match.start,
            winner: match.winner,
            plays: match.moves,
            player1: match.player1,
            player_turn: match.player_turn,
            board: match.board,
        });
    }

}