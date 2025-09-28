import mongoose from "mongoose";
const { Schema } = mongoose;

const UserSchema = new Schema({
  role: { type: String, enum: ["ADMIN","SUPERADMIN"], default: "ADMIN" },
  name: String,
  email: { type: String, unique: true, required: true },
  passwordHash: String,
}, { timestamps: true });

export default mongoose.models.User || mongoose.model("User", UserSchema);
