import mongoose from 'mongoose';

const { Schema } = mongoose;

const TagShema = new Schema({
  title: String,
});

const Tag = mongoose.model('Tag', TagShema);
export default Tag;
