import express, { Router } from "express"
import { toDoController } from "../controllers/task.controller";
import { userRouteProtection } from "../middlewares/routeProtector";

const toDoRoutes: Router = express.Router();

// toDoRoutes.use(userRouteProtection)
toDoRoutes.post('/create-task/:id', toDoController.addTask)
toDoRoutes.get('/all-task/:id', toDoController.fetchTask)
toDoRoutes.patch('/:userId/task/:taskId', toDoController.updateTask)

export default toDoRoutes