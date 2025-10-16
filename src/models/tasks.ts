import { ObjectId } from "mongodb";
export default class Task {
	constructor(
		public taskname: string,
		public time: Number,
		public completed: boolean,
		public id?: ObjectId
	) {}
}
