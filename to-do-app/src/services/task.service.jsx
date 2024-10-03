import axios from "axios"
const baseUrl = 'http://localhost:8000/api/v1/to-do';

const addTask = async (taskData, userId) => {
    try {
        const response = axios.post(`${baseUrl}/create-task/${userId}`, taskData)
        return response;
    } catch (error) {
        throw error;
    }
}

const fetchTasks = async (userId) => {
    try {
        const response = axios.get(`${baseUrl}//all-task/${userId}`);
        return response;
    } catch (error) {
        throw error;
    }
}

const deleteTask = async (taskId) => {
    try {
        const response = axios.delete(`${baseUrl}/delete-task/${taskId}`);
        return response
    } catch (error) {

    }
}

export const taskService = {
    addTask,
    fetchTasks,
    deleteTask
}