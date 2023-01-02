import "reflect-metadata";
import express from "express";
import 'express-async-errors'
import handleError from './errors/handleError'
import userRoutes from "./routes/user.routes";
import authRoutes from "./routes/auth.routes";
import categoriesRoutes from "./routes/category.routes";
import propertiesRoutes from "./routes/property.routes";
import schedulesRoutes from "./routes/schedule.routes";


const app = express();
app.use(express.json());
app.use("/users", userRoutes);
app.use("/login", authRoutes);
app.use("/categories", categoriesRoutes);
app.use("/properties", propertiesRoutes);
app.use("/schedules", schedulesRoutes);

app.use(handleError)

export default app;