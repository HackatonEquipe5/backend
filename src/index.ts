import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { connectDB } from "./db";
import { cors } from 'hono/cors'
import connectObjectRoute from "./routes/connectObjectRoutes";

const app = new Hono();

connectDB();
app.use(
  '*',
  cors({
    origin: 'http://localhost:4000',  
    allowMethods: ['GET', 'POST', 'PUT', 'DELETE'], 
    allowHeaders: ['Content-Type', 'Authorization']
  })
)

app.route('/api', connectObjectRoute)

serve(app);
