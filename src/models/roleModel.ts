import mongoose from "mongoose";

// shape data
const roleSchema = new mongoose.Schema(
  {
    name: String,
    description: String,
  },
  {
    timestamps: true, // createdAt, updatedAt
  }
);

export const Role = mongoose.model("Role", roleSchema);
