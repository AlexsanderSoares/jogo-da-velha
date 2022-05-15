import { Match, Player } from "../../domain/entities/Match";

export interface ExitMatchRepository{
    findMatchByPlayerId(socketPlayerId: string): Promise<Match>;
    exitPlayerAndFinishMatch(matchId: string, player: Player): Promise<Match>;
}