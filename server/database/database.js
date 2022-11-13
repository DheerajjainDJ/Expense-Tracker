import mongoose from "mongoose";

const connectToDb = async (username,password) => {
  const url = `mongodb+srv://${username}:${password}@cluster0.1rjwk.mongodb.net/Transactions?retryWrites=true&w=majority`;
  try {
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("database successfully connected");
  } catch (error) {
    console.log("Connection error:", error.message);
  }
};

export default connectToDb;
