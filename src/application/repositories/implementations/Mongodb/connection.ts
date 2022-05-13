import mongoose from "mongoose";

mongoose.connect('mongodb://localhost/jogodavelha');
mongoose.Promise = global.Promise;

export {mongoose};