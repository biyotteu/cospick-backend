import Tag from '../../models/tag';
import monggose from 'mongoose';
import JoiObjectId from 'joi-objectid';
import Joi from 'joi';

const mJoi = JoiObjectId(Joi);

const { ObjectId } = monggose.Types;
export const getTagById = async (ctx) => {
  const { id } = ctx.params;
  if (!ObjectId.isValid(id)) {
    ctx.status = 400;
    return;
  }
  try {
    const tag = await Tag.findById(id);
    if (!tag) {
      ctx.status = 404;
      return;
    }
    ctx.body = tag;
  } catch (e) {
    ctx.throw(500, e);
  }
};

export const write = async (ctx) => {
  const schema = Joi.object().keys({
    title: Joi.string().required(),
  });
  const result = schema.validate(ctx.request.body);
  if (result.error) {
    ctx.status = 400;
    ctx.body = result.error;
    return;
  }
  const { title } = ctx.request.body;
  const tag = new Tag({
    title,
  });
  try {
    await tag.save();
    ctx.body = tag;
  } catch (e) {
    ctx.throw(500, e);
  }
};
