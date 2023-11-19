import mongoose from "mongoose";

// Set 'strictQuery' to false to suppress the deprecation warning
mongoose.set("strictQuery", false);

export default mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true })
  .then(() => {
    console.log("MongoDB is connected");
  })
  .catch((err) => {
    console.log(err);
  });
