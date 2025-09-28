import mongoose from "mongoose";
const Schema = mongoose.Schema;
const CourtSchema = new Schema({
  competitionId: { type: Schema.Types.ObjectId, ref: "Competition" },
  round: String,
  courtNumber: Number,
  petitionerTeamId: { type: Schema.Types.ObjectId, ref: "Team" },
  respondentTeamId: { type: Schema.Types.ObjectId, ref: "Team" },
  judges: [{ judgeId: { type: Schema.Types.ObjectId, ref: "Judge" }, status: { type: String, enum: ["Pending","Online","Completed"], default: "Pending" }, citation: String }],
  courtManager: { name: String, password: String, status: { type: String, enum: ["Pending","Online","Completed"], default: "Pending" } }
}, { timestamps: true });

export default mongoose.models.Court || mongoose.model("Court", CourtSchema);
