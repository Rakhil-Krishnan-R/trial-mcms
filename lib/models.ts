import mongoose, { Schema, models, model } from "mongoose";

const UserSchema = new Schema({
  role: { type: String, enum: ["ADMIN", "SUPERADMIN"], required: true, default: "ADMIN" },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
}, { timestamps: true });

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
  totalMarks: Number,
}, { timestamps: true });

const TeamSchema = new Schema({
  competitionId: { type: Schema.Types.ObjectId, ref: "Competition", required: true },
  teamCode: String,
  speakers: [{ name: String, gender: { type: String, enum: ["Male", "Female"] }, role: String }],
  tieBreakerScores: { memorialScore: Number, researcherTest: Number }
}, { timestamps: true });

const JudgeSchema = new Schema({
  name: String,
  citation: String,
  email: String,
  phone: String,
  pastAssignments: [{ competitionId: Schema.Types.ObjectId, courtId: Schema.Types.ObjectId, round: String }]
}, { timestamps: true });

const CourtSchema = new Schema({
  competitionId: { type: Schema.Types.ObjectId, ref: "Competition", required: true },
  round: String,
  courtNumber: Number,
  petitionerTeamId: { type: Schema.Types.ObjectId, ref: "Team" },
  respondentTeamId: { type: Schema.Types.ObjectId, ref: "Team" },
  judges: [{ judgeId: { type: Schema.Types.ObjectId, ref: "Judge" }, status: { type: String, enum: ["Pending", "Online", "Completed"], default: "Pending" } }],
  courtManager: { name: String, password: String, status: { type: String, enum: ["Pending", "Online", "Completed"], default: "Pending" } },
}, { timestamps: true });

const JudgeScoreSchema = new Schema({
  courtId: { type: Schema.Types.ObjectId, ref: "Court" },
  judgeId: { type: Schema.Types.ObjectId, ref: "Judge" },
  team: { type: String, enum: ["Petitioner", "Respondent"] },
  speakerScores: [{ speakerName: String, criterion: String, score: Number }],
  submittedAt: Date,
});

const ManagerTimesheetSchema = new Schema({
  courtId: { type: Schema.Types.ObjectId, ref: "Court" },
  allocations: {
    totalTimePerTeam: Number,
    petitioner: { speaker1: Number, speaker2: Number, rebuttal: Number },
    respondent: { speaker1: Number, speaker2: Number, rebuttal: Number },
  },
  timeLogs: [{ speaker: String, startTime: Date, endTime: Date, duration: Number }],
  submittedAt: Date
});

const ResultSchema = new Schema({
  competitionId: { type: Schema.Types.ObjectId, ref: "Competition" },
  round: String,
  teamLeaderboard: [{ rank: Number, teamId: Schema.Types.ObjectId, wins: Number, totalScore: Number, tieBreakerUsed: Boolean }],
  bestSpeakers: {
    male: [{ rank: Number, name: String, teamId: Schema.Types.ObjectId, score: Number }],
    female: [{ rank: Number, name: String, teamId: Schema.Types.ObjectId, score: Number }]
  },
  generatedAt: Date,
});

export const User = models.User || model("User", UserSchema);
export const Competition = models.Competition || model("Competition", CompetitionSchema);
export const Team = models.Team || model("Team", TeamSchema);
export const Judge = models.Judge || model("Judge", JudgeSchema);
export const Court = models.Court || model("Court", CourtSchema);
export const JudgeScore = models.JudgeScore || model("JudgeScore", JudgeScoreSchema);
export const ManagerTimesheet = models.ManagerTimesheet || model("ManagerTimesheet", ManagerTimesheetSchema);
export const Result = models.Result || model("Result", ResultSchema);
