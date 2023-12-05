import mongoose from 'mongoose'
const ObjectId = mongoose.Schema.Types.ObjectId;

const cartSchema = new mongoose.Schema(
  {
    userId: {
        type: ObjectId,
        required: true,
        ref: "User",
        unique: true,
        trim: true
    },
    items: [
        {
            productId: {
                type: ObjectId,
                required: true,
                ref: "Product",
                trim: true
            },
            quantity: {
                type: Number,
                required: true,
                trim: true,
                minlength: 1
            },
            _id : false
        }],
    totalItems: {
        type: Number,
        required: true,
    },
    totalPrice: {
        type: Number,
        required: true,
    }
    
},
{ timestamps: true }    
);

export default mongoose.model("userCart", cartSchema);
