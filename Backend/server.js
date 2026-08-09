import express  from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js"
import productRoutes from "./routes/productsRoutes.js"
import cartRoutes from "./routes/cart.js"
import addressRoutes from "./routes/address.js"
import orderRoutes from "./routes/order.js"

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/auth',authRoutes);
app.use('/api/products',productRoutes);
app.use('/api/cart',cartRoutes);
app.use('/api/address',addressRoutes);
app.use('/api/order',orderRoutes);

connectDB();

app.listen(5000,()=>{
    console.log("server is running on port 5000");
    
});