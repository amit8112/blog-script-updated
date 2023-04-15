import mongoose from "mongoose";
const PORT = process.env.PORT || 9000;


const connectToMongo = async () => {
  const res = await mongoose.connect("mongodb://localhost:27017/blog-mern-app");
  if (res) {
    console.log("Data base connected succesfully");
  }
};
export default connectToMongo;
