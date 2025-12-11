import mongoose from "mongoose";

export const connectMongo = (db_url) => {
  //   console.log(`mongo db url ${db_url}`);
  return mongoose.connect(db_url);
};
