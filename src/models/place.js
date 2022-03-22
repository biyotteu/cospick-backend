import mongoose from 'mongoose';

const { Schema } = mongoose;

const PlaceShema = new Schema({
  // id: {
  //   type: Number,
  //   unique: true,
  //   required: true,
  // },
  title: String,
  body: String,
  cost: Number,
  imgs: [
    {
      data: Buffer,
      contentType: String,
    },
  ],
});

const Place = mongoose.model('Place', PlaceShema);
export default Place;
