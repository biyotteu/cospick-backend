import mongoose from 'mongoose';

const { Schema } = mongoose;

const UserSchema = new Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  nickname: String,
  age: Number,
  friends: [mongoose.Types.ObjectId],
  bookmark: [mongoose.Types.ObjectId],
  own_course: [mongoose.Types.ObjectId],
  likes: [mongoose.Types.ObjectId],
  created: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model('User', UserSchema);
export default User;
