export const environments = {
  PORT: parseInt(process.env.PORT || "4000"),
  URI: process.env.MONGODB_URI || "mongodb://localhost:27017/test",
  JWT_SECRET: process.env.JWT_SECRET || "secret",
};
