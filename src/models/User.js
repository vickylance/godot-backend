import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    min: 6,
    max: 255,
  },
  username: {
    type: String,
    required: true,
    min: 6,
    max: 255,
  },
  email: {
    type: String,
    required: true,
    min: 6,
    max: 255,
  },
  password: {
    type: String,
    required: true,
    min: 6,
    max: 1024,
  },
  created_date: {
    type: Date,
    default: new Date(),
  },
  confirmed: {
    type: Boolean,
    required: true,
    default: false,
  },
});

export default mongoose.model('User', userSchema);
