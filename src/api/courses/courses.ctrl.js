import Course from '../../models/course';
import monggose from 'mongoose';
import JoiObjectId from 'joi-objectid';
import Joi from 'joi';

const mJoi = JoiObjectId(Joi);

const { ObjectId } = monggose.Types;

export const getCourseById = async (ctx) => {
  const { id } = ctx.params;
  if (!ObjectId.isValid(id)) {
    ctx.status = 400;
    return;
  }
  try {
    const course = await Course.findById(id);
    if (!course) {
      ctx.status = 404;
      return;
    }
    ctx.body = course;
  } catch (e) {
    ctx.throw(500, e);
  }
};

export const write = async (ctx) => {
  const schema = Joi.object().keys({
    title: Joi.string().required(),
    body: Joi.string().required(),
    whowith: Joi.array().items(Joi.string()).required(),
    places: Joi.array().items(mJoi()).required(),
    tags: Joi.array().items({
      id: mJoi(),
      title: Joi.string(),
    }),
  });

  const result = schema.validate(ctx.request.body);
  if (result.error) {
    ctx.status = 400;
    ctx.body = result.error;
    return;
  }
  const { title, body, whowith, places, tags } = ctx.request.body;
  const course = new Course({
    title,
    body,
    // owner: ctx.state.user,
    like: 0,
    whowith,
    places,
    tags,
  });
  try {
    await course.save();
    ctx.body = course;
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
    const courses = await Course.find()
      .sort({ _id: -1 })
      .limit(10)
      .skip((page - 1) * 10)
      .exec();
    const courseCount = await Course.countDocuments().exec();
    ctx.set('Last-Page', Math.ceil(courseCount / 10));
    ctx.body = courses.map((post) => post.toJSON());
    // .map((post) => ({
    //   ...post,
    //   body:
    //     post.body.length < 20 ? post.body : `${post.body.slice(0, 20)}...`,
    // }));
  } catch (e) {
    ctx.throw(500, e);
  }
};
