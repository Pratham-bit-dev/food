import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export const connectDB = async () => {
  await mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => console.log("✅ MongoDB Atlas Connected"))
    .catch((err) => {
      console.error("❌ MongoDB Connection Error:", err.message);
      process.exit(1);
    });
};

// MONGODB_URI='mongodb+srv://prathm_26:Prathm_2002@cluster0.o1d4lnp.mongodb.net/food-delivery'
// JWT_SECRET=super_secure_key
// PORT=5000
