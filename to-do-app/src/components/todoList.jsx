import React, { useEffect, useState } from 'react';
import AddTask from './add-task';
import { useTodo } from '../hooks/useTodos';
import { taskService } from '../services/task.service';
import { toast, ToastContainer } from 'react-toastify';

const TodoList = () => {
    const [showModal, setShowModal] = useState({
        condition: false,
        page: '',
        taskId: '',
    });
    const [date, setDate] = useState({
        startDate: '',
        endDate: ''
    });
    const userId = localStorage.getItem('userId');
    const { tasks } = useTodo(userId, showModal, date);

    const dateFormat = (isoString) => {
        const date = new Date(isoString);
        const year = date.getFullYear();
        let month = date.getMonth() + 1;
        let day = date.getDate();

        month = month < 10 ? `0${month}` : month;
        day = day < 10 ? `0${day}` : day;

        return `${year}-${month}-${day}`;
    }

    const openModal = () => {
        setShowModal({ ...showModal, condition: true, page: 'add' });
    }

    const openUpdateModal = (id) => {
        setShowModal({ ...showModal, condition: true, page: 'update', taskId: id });
    }

    const handleModalClose = () => {
        setShowModal(false);
    }

    const deleteTask = async (id) => {
        const response = await taskService.deleteTask(id);
        if (response.data.message === "Task deleted") {
            toast.warn(response.data.message);
            setShowModal(true);
        } else {
            toast.warning(response.data.message)
        }
    }

    const dateHandler = async () => {
        try {
            const task = await taskService.taskDateSorting(date, userId);
            const { data } = task;
            setDelete('date')
        } catch (error) {

        }
    }

    if (date.startDate && date.endDate) {
        dateHandler()
    }



    return (
        <div className="h-[100vh] flex justify-center items-center font-serif">
            <div className='min-w-[800px] '>
                <div className='top mt-5 flex items-end justify-between flex-wrap flex-shrink-0'>
                    <div className=''>
                        <h1 className='text-4xl font-medium font-sans'>My Todo</h1>
                    </div>
                    <div className='flex flex-col items-end'>
                        <button className='bg-gray-700 text-white py-2 px-4 rounded-lg' onClick={openModal}>New task</button>
                        <div className='mt-5'>
                            <input type="date" onChange={(e) => setDate({ ...date, startDate: e.target.value })} className='border-2 border-blue-200 rounded-md py-1 px-3 me-2' />
                            <input type="date" onChange={(e) => setDate({ ...date, endDate: e.target.value })} className='border-2 border-blue-200 rounded-md py-1 px-3' />
                        </div>
                    </div>
                    <div className="container mx-auto p-4">
                        <h1 className="text-2xl font-semibold mb-6 text-center font-sans">Task List</h1>

                        <div className="overflow-x-auto">
                            <table className="min-w-full table-auto border-collapse border border-gray-300">
                                <thead>
                                    <tr className="bg-gray-200">
                                        <th className="px-4 py-2 text-left font-medium text-gray-600 border border-gray-300">SI.No</th>
                                        <th className="px-4 py-2 text-left font-medium text-gray-600 border border-gray-300">Title</th>
                                        <th className="px-4 py-2 text-left font-medium text-gray-600 border border-gray-300">Description</th>
                                        <th className="px-4 py-2 text-left font-medium text-gray-600 border border-gray-300">Due Date</th>
                                        <th className="px-4 py-2 text-left font-medium text-gray-600 border border-gray-300">Completed</th>
                                        <th className="px-4 py-2 text-center font-medium text-gray-600 border border-gray-300">Actions</th>
                                    </tr>
                                </thead>
                                {!tasks.loading && <tbody>
                                    {tasks.tasks.map((x, i) => {
                                        const taskStyle = {
                                            color: x.status === 'Pending' ? 'red' : x.status === 'Complete' ? 'green' : 'rgb(209, 216, 2)',
                                        };
                                        return (
                                            <tr className="bg-white hover:bg-gray-50" key={x._id}>
                                                <td className="px-4 py-2 border border-gray-300">{i + 1}</td>
                                                <td className="px-4 py-2 border border-gray-300">{x.title}</td>
                                                <td className="px-4 py-2 border border-gray-300">{x.descriotion}</td>
                                                <td className="px-4 py-2 border border-gray-300 font-mono">{dateFormat(x.dueDate)}</td>
                                                <td className="px-4 py-2 border border-gray-300" style={taskStyle}>
                                                    <span >{x.status}</span>
                                                </td>
                                                <td className="px-4 py-2 text-center border border-gray-300 font-sans">
                                                    <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition" onClick={() => openUpdateModal(x._id)}>Edit</button>
                                                    <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition ml-2" onClick={() => { deleteTask(x._id) }}>Delete</button>
                                                </td>
                                            </tr>
                                        )
                                    })}
                                </tbody>}
                            </table>
                        </div>
                        {tasks.loading && <h1 className='text-center mt-6 text-3xl text-gray-400'>Loading...</h1>}
                        {tasks.empty && <h1 className='text-center mt-6 text-3xl text-gray-400'>Task is empty</h1>}
                    </div>
                </div>

            </div>
            <AddTask showModal={showModal} closeModal={handleModalClose} />

            <ToastContainer
                position="top-center"
                autoClose={5000} />
        </div>
    )
}

export default TodoList;















{/* <div classNameName="boards w-full mt-16 h-[460px] flex justify-between">
                    <div>
                        <Start data={fromStart} />
                    </div>
                    <div>
                        <Progress values={prgrsValu} />
                    </div>
                    <div>
                        <Complete />
                    </div>
                </div> */}