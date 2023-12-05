import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    category:{
      type: String,
      required: true,
      lowercase: true,
    },
    
  },
  { timestamps: true }
);

export default mongoose.model("category", categorySchema);
