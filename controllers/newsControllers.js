import db from "../db/index.js";
import { ObjectId } from "mongodb";

const NEWS_COLLECTION = "news";

export const getNews = async (ctx) => {
  const query = ctx.request.query;

  try {
    const cursor = db
      .collection(NEWS_COLLECTION)
      .find({ title: query.title, date: query.date })
      .sort({ title: query.sortByTitle, date: query.sortByDate });

    const news = await cursor.toArray();

    ctx.body = news;
    ctx.status = 200;
  } catch (err) {
    ctx.throw(500);
  }
};

export const addNews = async (ctx) => {
  try {
    await db.collection(NEWS_COLLECTION).insertOne(ctx.request.body);

    ctx.status = 200;
  } catch (err) {
    ctx.throw(500);
  }
};

export const updateNews = async (ctx) => {
  const body = ctx.request.body;
  const filter = { _id: new ObjectId(body._id) };
  const updateDoc = {
    $set: {
      date: body.date,
      title: body.title,
      shortDescription: body.shortDescription,
      text: body.text,
    },
  };

  try {
    await db.collection(NEWS_COLLECTION).updateOne(filter, updateDoc);

    ctx.status = 200;
  } catch (err) {
    ctx.throw(500);
  }
};

export const deleteNews = async (ctx) => {
  const body = ctx.request.body;
  const query = { _id: new ObjectId(body._id) };

  try {
    await db.collection(NEWS_COLLECTION).deleteOne(query);

    ctx.status = 200;
  } catch (err) {
    ctx.throw(500);
  }
};
