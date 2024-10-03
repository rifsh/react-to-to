import axios from "axios";
import { useEffect, useState } from "react";
import { taskService } from "../services/task.service";

const useTodo = (userId, s) => {
    const [tasks, setTasks] = useState([]);
    useEffect(() => {
        const fetchTasks = async () => {
            const data = await taskService.fetchTasks(userId);
            setTasks(data.data.data);
            console.log('sdsdsd');
            
        }
        fetchTasks()
    }, [s]);
    return { tasks }
}

export { useTodo }