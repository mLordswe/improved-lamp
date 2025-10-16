// External Dependencies
import express, { type Request, type Response } from "express";
import { ObjectId } from "mongodb";
import { collections } from "../services/Connect.js";
import Task from "../models/tasks.js";

// Global Config
export const taskRouter = express.Router();
taskRouter.use(express.json());
// GET
taskRouter.get("/", async (_req: Request, res: Response) => {
	try {
		const tasks = (await collections.tasks?.find({}).toArray()) as unknown as Task[];
		res.status(200).send(tasks);
	} catch (error: any) {
		res.status(500).send(error.message);
	}
});

taskRouter.get("/:id", async (req: Request, res: Response) => {
	const id = req?.params?.id;
	try {
		const query = { _id: new ObjectId(id) };
		const task = (await collections.tasks?.findOne(query)) as unknown as Task;
		if (task) {
			res.status(200).send(task);
		}
	} catch (error: any) {
		res.status(404).send(`unable to find matching document with id: ${req.params.id}`);
	}
});
// POST
taskRouter.post("/", async (req: Request, res: Response) => {
	try {
		const newTask = req.body as Task;
		const result = await collections.tasks?.insertOne(newTask);
		console.log(req.body);
		console.log("collection.tasks", collections.tasks);
		result
			? res.status(201).send(`Successfully created a new task with id ${result.insertedId}`)
			: res.status(500).send("Failed to create a new task.");
	} catch (error) {
		console.error(error);
		res.status(400).send({ message: error });
	}
});
// PUT
taskRouter.put("/:id", async (req: Request, res: Response) => {
	const id = req?.params?.id;

	try {
		const updatedTask: Task = req.body as Task;
		const query = { _id: new ObjectId(id) };

		const result = await collections.tasks?.updateOne(query, { $set: updatedTask });

		result
			? res.status(200).send(`Successfully updated task with id ${id}`)
			: res.status(304).send(`task with id: ${id} not updated`);
	} catch (error: any) {
		console.error(error.message);
		res.status(400).send(error.message);
	}
});
// DELETE
taskRouter.delete("/:id", async (req: Request, res: Response) => {
	const id = req?.params?.id;
	try {
		const query = { _id: new ObjectId(id) };
		const result = await collections.tasks?.deleteOne(query);

		if (result && result.deletedCount) {
			res.status(202).send(`Successfully deleted task with id: ${id}`);
		} else if (!result) {
			res.status(202).send(`Failed to delete task with id: ${id}`);
		} else if (!result.deletedCount) {
			res.status(404).send(`Task with id ${id} does not exist`);
		}
	} catch (error: any) {
		console.error(error.message);
		res.status(400).send(error.message);
	}
});
