import axios from "axios";
import { useEffect, useState } from "react";
import { taskService } from "../services/task.service";

const useTodo = (userId, s, d) => {
    const [tasks, setTasks] = useState({
        tasks: [],
        loading: true,
        empty: false
    });
    useEffect(() => {
        const fetchTasks = async () => {
            const taskData = await taskService.fetchTasks(userId);
            const { data } = taskData;
            if (data.data.length === 0) {
                setTasks({ tasks: data.data, empty: true, loading: false });
            } else {
                setTasks({ tasks: data.data, empty: false, loading: false });
            }
        }
        fetchTasks();

    }, [s, d]);
    return { tasks }
}

export { useTodo }