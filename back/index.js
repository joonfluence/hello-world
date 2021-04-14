import dotenv from "dotenv";
import "./config/mongoose.js";
import app from "./config/express.js";
dotenv.config();

const PORT = process.env.PORT || 5000;
const handleListening = () =>
  console.log(`✅ Listening on: http://localhost:${PORT}`);
app.listen(PORT, handleListening);
