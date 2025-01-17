import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { connectDB } from './config/db.js';
import productRoutes from './routes/product.route.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS

// Enable JSON parsing for incoming requests
app.use(express.json());

// Define API routes before serving static files
app.use("/api/products", productRoutes);

// Serve static files only in production
const __dirname = path.resolve();
if (process.env.NODE_ENV === "production") {
  // Serve React build files
  app.use(express.static(path.join(__dirname, "/frontend/dist")));

  // Fallback for any non-API routes
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  });
}

// Start the server
app.listen(PORT, () => {
  connectDB();
  console.log(`Server started at http://localhost:${PORT}`);
});
