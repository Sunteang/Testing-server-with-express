import "dotenv/config";

export default {
  mongoUrl: process.env.MONGO_URL,
};
console.log(process.env.MONGO_URL);
