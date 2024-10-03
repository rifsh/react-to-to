import { NextFunction, Request, Response } from "express";
import catchAsync from "../utils/asyncHandler";
import { taskService } from "../services/taskService";
import { Task } from "../model/interfaces/task.model";
import { CustomeError } from "../utils/customerror";
import { ObjectId } from "mongoose";

const addTask = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const taskData: Task = req.body;
    taskData.user = req.params.id as unknown as ObjectId;
    const data = await taskService.addTask(taskData);
    if (data) {
        res.status(200).json({
            message: 'Success',
            data
        })
    } else {
        next(new CustomeError('Error creating Task', 500))
    }
})
const fetchTask = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const userId: string = req.params.id;
    const data: Task[] | boolean = await taskService.fetchTask(userId);
    if (data) {
        res.status(200).json({
            message: "Suucessfully fetched all task",
            data
        })
    } else {
        next(new CustomeError('No data found', 404))
    }
})
const updateTask = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const userId: string = req.params.userId;
    const taskId: string = req.params.taskId;
    const updateTaskData: Task = req.body;
    const data = await taskService.updateTask(userId, taskId, updateTaskData);
    if (data) {
        res.status(200).json({
            message: data
        })
    } else {
        res.status(500).json({
            message: "Something went wrong while updating"
        })
    }

})

export const toDoController = {
    addTask,
    fetchTask,
    updateTask
}