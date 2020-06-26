module.exports = {
  PORT: process.env.PORT || 8000,
  NODE_ENV: process.env.NODE_ENV || "development",
  API_TOKEN: process.env.API_TOKEN,
  CLIENT_ORIGIN: process.env.CLIENT_ORIGIN,
  DATABASE_URL:
    process.env.DATABASE_URL || "postgresql://postgres@localhost/timespace",
  JWT_SECRET: process.env.JWT_SECRET || "change-this-secret",
  JWT_EXPIRY: process.env.JWT_EXPIRY || "3h",
  CLOUDINARY_URL: process.env.CLOUDINARY_URL,
  STRIPE_SECRET: process.env.STRIPE_SECRET,
  WEBHOOK_SECRET: process.env.WEBHOOK_SECRET
};
