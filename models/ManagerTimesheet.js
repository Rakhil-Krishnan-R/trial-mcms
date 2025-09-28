import mongoose from "mongoose";
const Schema = mongoose.Schema;
const ManagerTimesheetSchema = new Schema({
  courtId: { type: Schema.Types.ObjectId, ref: "Court" },
  allocations: {
    totalTimePerTeam: Number,
    petitioner: { speaker1: Number, speaker2: Number, rebuttal: Number },
    respondent: { speaker1: Number, speaker2: Number, rebuttal: Number }
  },
  timeLogs: [{ speaker: String, startTime: Date, endTime: Date, duration: Number }],
  submittedAt: Date
}, { timestamps: true });

export default mongoose.models.ManagerTimesheet || mongoose.model("ManagerTimesheet", ManagerTimesheetSchema);
