import { Match, Player } from "../../domain/entities/Match";

export interface FinishMatchRepository{
    findMatchById(matchId: string): Promise<Match>;
    finishMatch(matchId: string, winner: Player): Promise<Match>;
}