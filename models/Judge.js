import mongoose from "mongoose";
const Schema = mongoose.Schema;
const JudgeSchema = new Schema({
  name: String,
  citation: String,
  email: String,
  phone: String,
  pastAssignments: [{ competitionId: Schema.Types.ObjectId, courtId: Schema.Types.ObjectId, round: String }]
}, { timestamps: true });

export default mongoose.models.Judge || mongoose.model("Judge", JudgeSchema);
