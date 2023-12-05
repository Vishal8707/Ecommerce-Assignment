import mongoose from "mongoose";
const ObjectId = mongoose.Schema.Types.ObjectId;

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    categoryId: {
      type: ObjectId,
      ref: "category",
      required: true,
    },
    description: {
      type: String,
      required: true,
      lowercase: true,
    },
    price: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    availability: {
      type: String,
      default: "inStock",
    },
    deletedAt: {
      type: Date,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Product", productSchema);
