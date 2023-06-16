import express,{ application} from "express";
import taskRoutes from "./src/routes/Task.routes.js";
import morgan from "morgan";
import cors from "cors";



const app= express();

app.use(express.json())
app.use(cors());
app.use(morgan("dev"))
app.use('/api', taskRoutes)

export default app

