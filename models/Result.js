import mongoose from "mongoose";
const Schema = mongoose.Schema;
const ResultSchema = new Schema({
  competitionId: { type: Schema.Types.ObjectId, ref: "Competition" },
  round: String,
  teamLeaderboard: [{ rank: Number, teamId: Schema.Types.ObjectId, wins: Number, totalScore: Number, tieBreakerUsed: Boolean }],
  bestSpeakers: {
    male: [{ rank: Number, name: String, teamId: Schema.Types.ObjectId, score: Number }],
    female: [{ rank: Number, name: String, teamId: Schema.Types.ObjectId, score: Number }]
  },
  generatedAt: Date
}, { timestamps: true });

export default mongoose.models.Result || mongoose.model("Result", ResultSchema);
