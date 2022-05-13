import { Match } from "../../domain/entities/Match";

export interface CreateMatchRepository{
    findLastId(): Promise<string>;
    save(match: Match): Promise<void>;
}