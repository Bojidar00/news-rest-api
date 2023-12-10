import Joi from "joi";

const getNewsQuerySchema = Joi.object({
  title: Joi.string(),
  date: Joi.date(),
  sortByTitle: Joi.number().valid(1, -1),
  sortByDate: Joi.number().valid(1, -1),
});

const postNewsSchema = Joi.object({
  date: Joi.date().required(),
  title: Joi.string().required(),
  shortDescription: Joi.string().required(),
  text: Joi.string().required(),
});

const putNewsSchema = Joi.object({
  _id: Joi.string().required(),
  date: Joi.date(),
  title: Joi.string(),
  shortDescription: Joi.string(),
  text: Joi.string(),
});

const deleteNewsSchema = Joi.object({
  _id: Joi.string().required(),
});

export const validateGet = async (ctx, next) => {
  try {
    await getNewsQuerySchema.validateAsync(ctx.request.query);
  } catch (err) {
    ctx.throw(400, err.details[0].message);
  }

  await next();
};

export const validatePost = async (ctx, next) => {
  try {
    await postNewsSchema.validateAsync(ctx.request.body);
  } catch (err) {
    ctx.throw(400, err.details[0].message);
  }

  await next();
};

export const validatePut = async (ctx, next) => {
  try {
    await putNewsSchema.validateAsync(ctx.request.body);
  } catch (err) {
    ctx.throw(400, err.details[0].message);
  }

  await next();
};

export const validateDelete = async (ctx, next) => {
  try {
    await deleteNewsSchema.validateAsync(ctx.request.body);
  } catch (err) {
    ctx.throw(400, err.details[0].message);
  }

  await next();
};
