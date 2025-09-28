import mongoose from "mongoose";
const Schema = mongoose.Schema;
const JudgeScoreSchema = new Schema({
  courtId: { type: Schema.Types.ObjectId, ref: "Court" },
  judgeId: { type: Schema.Types.ObjectId, ref: "Judge" },
  team: { type: String, enum: ["Petitioner","Respondent"] },
  speakerScores: [{ speakerName: String, criterion: String, score: Number }],
  submittedAt: Date
}, { timestamps: true });

export default mongoose.models.JudgeScore || mongoose.model("JudgeScore", JudgeScoreSchema);
