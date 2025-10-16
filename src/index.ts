import express, { type Request, type Response } from "express";
import { connectToDatabase } from "./services/Connect.js";
import { taskRouter } from "./routes/tasks.router.js";
import { error } from "console";
import { request } from "https";
const app = express();
const port = 3000;
connectToDatabase()
	.then(() => {
		app.use(express.json());
		app.use("/tasks", taskRouter);
		app.listen(port, () => {
			console.log(`Server started at http://localhost:${port}`);
		});
	})
	.catch((error: Error) => {
		console.error("Database connection failed", error);
		process.exit();
	});
