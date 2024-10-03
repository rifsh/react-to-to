import axios from "axios";
import { useEffect, useState } from "react";
import { taskService } from "../services/task.service";

const useTodo = (userId, s, d) => {
    const [tasks, setTasks] = useState([]);
    const [tasksDelete, setTasksDelete] = useState();
    useEffect(() => {
        const fetchTasks = async () => {
            const data = await taskService.fetchTasks(userId);
            setTasks(data.data.data);
            console.log('sdsdsd');
        }
        fetchTasks();
        console.log('sdsd');
        
    }, [s, d]);
    return { tasks }
}

export { useTodo }