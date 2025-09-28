import mongoose from "mongoose";
const Schema = mongoose.Schema;

const TeamSchema = new Schema({
  competitionId: { type: Schema.Types.ObjectId, ref: "Competition" },
  teamCode: String,
  speakers: [
    { name: String, gender: { type: String, enum: ["Male","Female"] }, role: String }
  ],
  tieBreakerScores: {
    memorialScore: Number,
    researcherTest: Number
  }
}, { timestamps: true });

export default mongoose.models.Team || mongoose.model("Team", TeamSchema);
