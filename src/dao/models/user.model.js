import mongoose, { Schema } from 'mongoose';

const userSchema = new Schema({
  first_name: { type: String, required: true },
  last_name: { type: String},
  email: { type: String, required: true, unique: true },
  age: { type: Number, required: false },
  password: { type: String },
  cartId: { type: String },
  role: { type: String, default: 'user' },

}, { timestamps: true });

export default mongoose.model('User', userSchema);