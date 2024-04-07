import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const productItemSchema = new mongoose.Schema({
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    quantity: {type:Number},
  }, { _id: false });
 
const CartSchema = new mongoose.Schema({
    products: { type: [productItemSchema], quantity: {type:Number},  default: [] }
}, {timestamps: true});

CartSchema.plugin(mongoosePaginate);
 
export default mongoose.model('Cart', CartSchema);
