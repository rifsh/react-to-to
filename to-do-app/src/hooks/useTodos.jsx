import axios from "axios";
import { useEffect, useState } from "react";
import { taskService } from "../services/task.service";

const useTodo = (userId, s, dates) => {
    const [tasks, setTasks] = useState({
        tasks: [],
        loading: true,
        empty: false
    });

    useEffect(() => {
        const fetchTasks = async () => {
            setTasks({ ...tasks, loading: true });
            const taskData = await taskService.fetchTasks(userId);
            const { data } = taskData;
            if (data.data.length === 0) {
                setTasks({ tasks: data.data, empty: true, loading: false });
            } else {
                setTasks({ tasks: data.data, empty: false, loading: false });
            }
        }

        const fetchTaskByDate = async () => {
            try {
                const task = await taskService.taskDateSorting(dates, userId);
                const { data } = task;
                if (data.data.length === 0) {
                    setTasks({ tasks: data.data, empty: true, loading: false });
                } else {
                    setTasks({ tasks: data.data, empty: false, loading: false });
                }
            } catch (error) {
                console.log(error);
            }
        };

        fetchTasks();
        if (dates.endDate) {
            fetchTaskByDate();
        }
    }, [s, dates.endDate]);
    return { tasks }
}

export { useTodo }