import mongoose from 'mongoose';

const { Schema } = mongoose;

const CourseShema = new Schema({
  // id: {
  //   type: Number,
  //   unique: true,
  //   required: true,
  // },
  title: String,
  body: String,
  owner: {
    id: mongoose.Types.ObjectId,
    nickname: String,
  },
  like: Number,
  whowith: [String],
  places: [mongoose.Types.ObjectId],
  tags: [
    {
      id: mongoose.Types.ObjectId,
      title: String,
    },
  ],
  created: {
    type: Date,
    default: Date.now,
  },
});

const Course = mongoose.model('Course', CourseShema);
export default Course;
