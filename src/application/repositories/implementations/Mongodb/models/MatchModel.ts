import {mongoose} from "../connection";

const PlaysSchema = new mongoose.Schema({
    playerNumber: Number,
    line: Number,
    column: Number,
});

const PlayerSchema = new mongoose.Schema({
    name: String,
    socket_id: String,
});

const MatchSchema = new mongoose.Schema({
    start: {
        type: Boolean,
    },
    plays: {
        type: [PlaysSchema],
        required: false
    },
    winner: {
        type: Number,
        required: false
    },
    player_turn: {
        type: String, 
        required: false,
    },
    player1: {
        type: PlayerSchema,
        required: true,
    },
    player2: {
        type: PlayerSchema,
        required: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

const MatchModel = mongoose.model('Match', MatchSchema);

export {MatchModel};