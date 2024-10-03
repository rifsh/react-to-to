import mongoose from "mongoose";
import { Task } from "../interfaces/task.model";

const schema = new mongoose.Schema<Task>({

    title: {
        type: String,
        required: [true, requiredFunction('title')]
    },
    descriotion: {
        type: String,
        required: [true, requiredFunction('Description')]
    },
    priority: {
        type: String,
        required: [true, requiredFunction('Priority')]
    },
    status: {
        type: String,
        default: 'Pending'
    },
    dueDate: {
        type: Date,
        required: [true, requiredFunction('Due date')]
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    updatedAt: {
        type: Date,
        default: Date.now()
    }
})

function requiredFunction(fieldName: string) {
    return `${fieldName} title is required`
}

export const taskModel = mongoose.model('Task',schema);