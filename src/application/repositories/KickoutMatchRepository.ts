import { Match, Player } from "../../domain/entities/Match";

export interface KickoutMatchRepository{
    findMatchByPlayerId(socketPlayerId: string): Promise<Match>;
    kickoutMatchPlayer(match: Match): Promise<Match>;
}