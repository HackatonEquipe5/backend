import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { connectDB } from "./db";
import { cors } from 'hono/cors'
import connectObjectRoute from "./routes/connectObjectRoutes";
import userRoutes from "./routes/userRoutes";
import iotCommuniqueRoutes from "./routes/iotCommuniqueRoute";
const app = new Hono();

connectDB();
app.use(
  '*',
  cors({
    origin: 'http://localhost:3001',
    allowMethods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowHeaders: ['Content-Type', 'Authorization']
  })
)

app.route('/api', connectObjectRoute)
app.route("/api", userRoutes);
app.route("/api", iotCommuniqueRoutes);

serve(app);
