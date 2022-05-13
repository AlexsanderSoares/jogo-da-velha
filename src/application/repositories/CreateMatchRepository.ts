import { Match } from "../../domain/entities/Match";

export interface CreateMatchRepository{
    save(match: Match): Promise<void>;
}