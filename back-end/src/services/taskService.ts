import { Task } from "../model/interfaces/task.model"
import { taskModel } from "../model/schemas/task.schema"

const addTask = async (data: Task): Promise<Task | boolean> => {
    try {
        const createTask: Task = await taskModel.create(data);
        return createTask
    } catch (error) {
        console.log(error);
        return false
    }
}
const fetchTask = async (id: string): Promise<Task[] | boolean> => {
    try {
        const data: Task[] = await taskModel.find({ user: id });
        if (data) {
            return data
        } else {
            return false
        }
    } catch (error) {
        console.log(error);
        return false;
    }
}
const updateTask = async (userId: string, taskId: string, updateData: Task): Promise<boolean | string> => {
    try {
        const data: Task = await taskModel.findOneAndUpdate({ user: userId, _id: taskId }, { $set: updateData });
        if (data) {
            return 'task Updated successfully';
        } else {
            return false;
        }
    } catch (error) {
        console.log(error);
        return false;
    }
}

export const taskService = {
    addTask,
    fetchTask,
    updateTask
}