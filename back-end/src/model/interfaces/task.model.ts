import { ObjectId } from "mongoose";

export interface Task {
    title: string,
    descriotion: string,
    priority: string,
    status: string,
    dueDate: Date,
    user: ObjectId,
    createdAt: Date,
    updatedAt: Date
}