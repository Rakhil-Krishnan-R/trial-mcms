import mongoose from "mongoose";
const Schema = mongoose.Schema;

const CompetitionSchema = new Schema({
  adminId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  name: String,
  collegeName: String,
  startDate: Date,
  endDate: Date,
  numberOfTeams: Number,
  numberOfCourtRooms: Number,
  teamPrefix: String,
  rounds: [{ name: String, enabled: Boolean }],
  scoringRubric: [{ criterion: String, maxMarks: Number }],
  totalMarks: Number
}, { timestamps: true });

export default mongoose.models.Competition || mongoose.model("Competition", CompetitionSchema);
