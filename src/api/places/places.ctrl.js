import Place from '../../models/place';
import mongoose from 'mongoose';
import JoiObjectId from 'joi-objectid';
import Joi from 'joi';
import fs from 'fs';

const mJoi = JoiObjectId(Joi);

const { ObjectId } = mongoose.Types;

export const getPlaceById = async (ctx) => {
  const { id } = ctx.params;
  if (!ObjectId.isValid(id)) {
    ctx.status = 400;
    return;
  }
  try {
    const place = await Place.findById(id);
    if (!place) {
      ctx.status = 404;
      return;
    }
    ctx.body = place;
  } catch (e) {
    ctx.throw(500, e);
  }
};

export const write = async (ctx) => {
  const schema = Joi.object().keys({
    title: Joi.string().required(),
    body: Joi.string().required(),
    cost: Joi.number(),
    imgs: Joi.array().items({
      data: Joi.binary(),
      contentType: Joi.string(),
    }),
  });

  const result = schema.validate(ctx.request.body);
  if (result.error) {
    ctx.status = 400;
    ctx.body = result.error;
    return;
  }
  const { title, body, cost, imgs } = ctx.request.body;
  const place = new Place({
    title,
    body,
    cost,
    imgs,
  });
  try {
    await place.save();
    ctx.body = place;
  } catch (e) {
    ctx.throw(500, e);
  }
};

export const list = async (ctx) => {
  const page = parseInt(ctx.query.page || '1', 10);
  if (page < 1) {
    ctx.status = 400;
    return;
  }
  try {
    const places = await Place.find()
      .sort({ _id: -1 })
      .limit(10)
      .skip((page - 1) * 10)
      .exec();
    const placeCount = await Place.countDocuments().exec();
    ctx.set('Last-Page', Math.ceil(placeCount / 10));
    ctx.body = places.map((place) => place.toJSON());
    //   .map((post) => ({
    //     ...post,
    //     body:
    //       post.body.length < 20 ? post.body : `${post.body.slice(0, 20)}...`,
    //   }));
  } catch (e) {
    ctx.throw(500, e);
  }
};
