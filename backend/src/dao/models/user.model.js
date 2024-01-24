import mongoose, { Schema } from 'mongoose';


const cartItemSchema = new mongoose.Schema({
  cart: { type: mongoose.Schema.Types.ObjectId, ref: 'Cart' }
}, { _id: false });

const userSchema = new Schema({
  first_name: { type: String, required: true },
  last_name: { type: String},
  email: { type: String, required: true, unique: true },
  age: { type: Number, required: false },
  password: { type: String },
  cartId: { type: [cartItemSchema], default:[] },
  role: { type: String, default: 'user' },

}, { timestamps: true });

export default mongoose.model('User', userSchema);