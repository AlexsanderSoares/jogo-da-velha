import { Match, Player } from "../../../../domain/entities/Match";
import { ExitMatchRepository } from "../../ExitMatchRepository";
import { MatchModel } from "./models/MatchModel";

export class ExitMatchMongoRepository implements ExitMatchRepository{
    async findMatchByPlayerId(socketPlayerId: string): Promise<Match> {
        return await MatchModel.findOne({
            $and: [
                {$or: [{'player1.socket_id': socketPlayerId}, {'player2.socket_id': socketPlayerId}]}
            ],
        });
    }

    async exitPlayerAndFinishMatch(matchId: string, player: Player): Promise<Match> {
        return await MatchModel.findByIdAndUpdate(matchId, {start: false, winner: player,}, {returnDocument: 'after'});
    }

    async exitPlayer(matchId: string, isPlayer1: boolean): Promise<Match> {
        
        const match = await MatchModel.findById(matchId);

        if(isPlayer1){
            match.player1 = match.player2;
            match.player_turn = match.player2;
        }

        match.player2 = null;
        
        if(!match.player1 && !match.player2){
            await MatchModel.deleteOne({_id: matchId}, {returnDocument: 'after'});
            return match;
        }else
            return await MatchModel.findByIdAndUpdate(matchId, match, {returnDocument: 'after'});

    }
}