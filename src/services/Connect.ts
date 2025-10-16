import * as dotenv from "dotenv";
import * as mongoDB from "mongodb";

export const collections: { tasks?: mongoDB.Collection } = {};
export async function connectToDatabase() {
	dotenv.config();
	const client: mongoDB.MongoClient = new mongoDB.MongoClient(process.env.DB_CONN_STRING as string);
	await client.connect();
	const db: mongoDB.Db = client.db(process.env.DB_NAME);
	const taskCollection: mongoDB.Collection = db.collection(process.env.TASK_COLLECTION_NAME as string);
	collections.tasks = taskCollection;
	console.log(
		`Successfully connect to DB ${db.databaseName} and collection ${taskCollection.collectionName}`
	);
}
