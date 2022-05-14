import {mongoose} from "../connection";

const PlaysSchema = new mongoose.Schema({
    playerNumber: Number,
    line: Number,
    column: Number,
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
    numberPlayers: {
        type: Number,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

const MatchModel = mongoose.model('Match', MatchSchema);

export {MatchModel};