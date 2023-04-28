import mongoose from "mongoose";

export async function mongoInit() {
  mongoose.connect(process.env.MONGO_DB!).then((mongoose) => {
    return mongoose;
  });
}
