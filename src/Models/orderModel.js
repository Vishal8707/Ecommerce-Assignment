import mongoose from 'mongoose'
const ObjectId = mongoose.Schema.Types.ObjectId;

const orderSchema = new mongoose.Schema(
    {
    userId: {
        type: ObjectId,
        ref: 'User',
        required: true
    },
    items: [{
        productId: { 
            type: ObjectId, 
            ref: 'Product', 
            required: true,
            
         },
        quantity: { 
            type: Number, 
            required: true, 
            min: 1
         },
         _id : false
    }],
    totalPrice: {
        type: Number,
        required: true,
    },
    totalItems: {
        type: Number,
        required: true,
    },
    totalQuantity: {
        type: Number,
        required: true,
    },
    cancellable: {
        type: Boolean,
        default: true
    },
    deletedAt: {
        type: Date
    },
    isDeleted: {
        type: Boolean,
        default: false
    }

}, { timestamps: true })

export default mongoose.model('OrderData', orderSchema)