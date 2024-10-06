import * as React from 'react';
import { useState, useEffect } from 'react';
import './add-task.css'
import { taskService } from '../services/task.service';
import { Bounce, toast, ToastContainer } from 'react-toastify';

const AddTask = ({ showModal, closeModal }) => {
    const userId = localStorage.getItem('userId');
    const [taskData, setTaskDate] = useState({
        title: '',
        descriotion: '',
        priority: 'low',
        dueDate: '',
        status: 'Pending',
        loading: false
    })

    useEffect(() => {
        const fetchTaskById = async () => {
            try {
                const task = await taskService.fetchTaskId(showModal.taskId);
                const { data } = task;
                const date = new Date(data.data.dueDate);
                const dateFormated = date.toISOString().slice(0, 10);
                setTaskDate({ ...taskData, title: data.data.title, descriotion: data.data.descriotion, dueDate: dateFormated, priority: data.data.priority, status: data.data.status });
            } catch (error) {

            }
        }

        if (showModal.page === 'update') {
            fetchTaskById()
        }

    }, [showModal.taskId]);

    if (!showModal.condition) {
        return null;
    }

    const addTask = async () => {
        let userId = localStorage.getItem('userId');
        setTaskDate({ ...taskData, loading: true });
        try {
            const data = await taskService.addTask(taskData, userId);
            if (data.data.message === 'Success') {
                toast.success('Task added');
                setTaskDate({ ...taskData, loading: false });
                closeModal();
            } else {
                setTaskDate({ ...taskData, loading: false });
                toast.warning("Something went wrong")
            }
        } catch (error) {
            setTaskDate({ ...taskData, loading: false });
            console.log(error);
            toast.warning("Something went wrong")
        }
    }

    const taskUpdate = async () => {
        setTaskDate({ ...taskData, loading: true })
        try {
            const data = await taskService.updateTask(userId, showModal.taskId, taskData);
            setTaskDate({ ...taskData, loading: false });
            toast.success('Success', {
                position: 'top-center',
                autoClose: 5000,
                draggable: true,
                theme: 'colored',
                progress: undefined,
                transition: Bounce
            })
            closeModal();
        } catch (error) {
            setTaskDate({ ...taskData, loading: false })
        }
    }

    return (
        <div>
            {showModal.page === 'add' && <div className="modal-backdrop flex flex-grow">
                <div className="modal-content min-w-[500px] bg-white rounded-xl py-3 px-5 flex items-start justify-center flex-col">
                    <div className='w-full flex items-center justify-center'>
                        <h2 className='text-3xl text-gray-400'>Add new task</h2>
                    </div>
                    <div className="w-full">
                        <form action="" className='flex flex-col h-[350px] justify-between mt-2'>
                            <div className='flex flex-col'>
                                <label htmlFor="" className='mb-1'>Name</label>
                                <input
                                    onChange={(e) => { setTaskDate({ ...taskData, title: e.target.value }) }}
                                    className='py-2 px-3 border border-gray-300 bg-white rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out'
                                    type="text"
                                    placeholder='Task name' />
                                {taskData.title === '' && <div className='text-red-600 text-sm'>* Title is required</div>}
                            </div>
                            <div className='flex flex-col'>
                                <label htmlFor="" className='mb-1'>Description</label>
                                <textarea
                                    name=""
                                    onChange={(e) => setTaskDate({ ...taskData, descriotion: e.target.value })}
                                    className='py-2 px-3 border border-gray-300 bg-white rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out'
                                    id=""></textarea>
                            </div>
                            <div className="">
                                <label htmlFor="priority" className="block text-sm font-medium text-gray-700 mb-2">Select Priority</label>
                                <select onChange={(e) => { setTaskDate({ ...taskData, priority: e.target.value }) }} id="priority" name="priority" className="block w-full py-2 px-3 border border-gray-300 bg-white rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out">
                                    <option value="low">Low</option>
                                    <option value="medium">Medium</option>
                                    <option value="high">High</option>
                                </select>
                            </div>
                            <div className='flex flex-col'>
                                <label htmlFor="" className='mb-1'>Due date</label>
                                <input
                                    className='py-2 px-3 border border-gray-300 bg-white rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out'
                                    onChange={(e) => setTaskDate({ ...taskData, dueDate: e.target.value })}
                                    type="date"
                                    placeholder='Task due date' />
                            </div>
                        </form>
                    </div>
                    <div className='flex justify-center w-full mt-4'>
                        <button onClick={addTask} className="me-3 text-center btn-close-modal bg-green-500 hover:bg-green-600 transition-all px-4 py-2 rounded-lg text-white">
                            {!taskData.loading && <span>Add</span>}
                            {taskData.loading && <span className='font-bold'>Loading...</span>}
                        </button>
                        <button onClick={closeModal} className="btn-close-modal text-center bg-red-500 hover:bg-red-600 transition-all px-3 py-2 rounded-lg text-white">Cancel</button>
                    </div>
                </div>
            </div>}

            {/* Update */}
            {showModal.page === 'update' && <div className="modal-backdrop flex flex-grow">
                <div className="modal-content min-w-[500px] bg-white rounded-xl py-3 px-5 flex items-start justify-center flex-col">
                    <div className='w-full flex items-center justify-center'>
                        <h2 className='text-3xl text-gray-400'>Update task</h2>
                    </div>
                    <div className="w-full">
                        <form action="" className='flex flex-col h-[350px] justify-between mt-2'>
                            <div className='flex flex-col'>
                                <label htmlFor="" className='mb-1'>Name</label>
                                <input
                                    name='title'
                                    value={taskData.title}
                                    onChange={(e) => { setTaskDate({ ...taskData, title: e.target.value }) }}
                                    className='py-2 px-3 border border-gray-300 bg-white rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out'
                                    type="text"
                                    placeholder='Task name' />
                                {taskData.title === null && <div className='text-red-600 text-sm'>* Title is required</div>}
                            </div>
                            <div className='flex flex-col'>
                                <label htmlFor="" className='mb-1'>Description</label>
                                <textarea
                                    name=""
                                    value={taskData.descriotion}
                                    onChange={(e) => setTaskDate({ ...taskData, descriotion: e.target.value })}
                                    className='py-2 px-3 border border-gray-300 bg-white rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out'
                                    id=""></textarea>
                            </div>
                            <div className="">
                                <label htmlFor="priority" className="block text-sm font-medium text-gray-700 mb-2">Select Priority</label>
                                <select
                                    value={taskData.priority}
                                    onChange={(e) => { setTaskDate({ ...taskData, priority: e.target.value }) }} id="priority" name="priority"
                                    className="block w-full py-2 px-3 border border-gray-300 bg-white rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out">
                                    <option value="low">Low</option>
                                    <option value="medium">Medium</option>
                                    <option value="high">High</option>
                                </select>
                            </div>
                            <div className='flex flex-col'>
                                <label htmlFor="" className='mb-1'>Due date</label>
                                <input
                                    value={taskData.dueDate}
                                    className='py-2 px-3 border border-gray-300 bg-white rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out'
                                    onChange={(e) => {
                                        const date = new Date(e.target.value);
                                        const dateFormated = date.toISOString().slice(0, 10);
                                        setTaskDate({ ...taskData, dueDate: dateFormated });
                                    }}
                                    type="date"
                                    placeholder='Task due date' />
                            </div>
                            <div className='flex items-center justify-around mt-3'>
                                {/* Pending Status */}
                                <div className='flex items-center'>
                                    <input
                                        value={taskData.status}
                                        onChange={(e) => setTaskDate({ ...taskData, status: 'Pending' })}
                                        type="radio"
                                        id="pending"
                                        name="status"
                                        className='w-5 h-5 text-blue-500 border-gray-300 focus:ring-blue-500'
                                    />
                                    <label
                                        className='ml-2 text-gray-700 font-medium'
                                        htmlFor="pending"
                                    >Pending</label>
                                </div>

                                {/* Started Status */}
                                <div className='flex items-center'>
                                    <input
                                        value={taskData.status}
                                        onChange={(e) => setTaskDate({ ...taskData, status: 'Started' })}
                                        type="radio"
                                        id="started"
                                        name="status"
                                        className='w-5 h-5 text-blue-500 border-gray-300 focus:ring-blue-500'
                                    />
                                    <label
                                        className='ml-2 text-gray-700 font-medium'
                                        htmlFor="started"
                                    >
                                        Started
                                    </label>
                                </div>

                                {/* Complete Status */}
                                <div className='flex items-center'>
                                    <input
                                        value={taskData.status}
                                        onChange={(e) => setTaskDate({ ...taskData, status: 'Complete' })}
                                        type="radio"
                                        id="complete"
                                        name="status"
                                        className='w-5 h-5 text-blue-500 border-gray-300 focus:ring-blue-500'
                                    />
                                    <label
                                        className='ml-2 text-gray-700 font-medium'
                                        htmlFor="complete"
                                    >
                                        Complete
                                    </label>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className='flex justify-center w-full mt-4'>
                        <button onClick={taskUpdate} className="me-3 btn-close-modal bg-green-500 hover:bg-green-600 transition-all px-4 py-2 rounded-lg text-white">
                            {taskData.loading && <span className='font-bold'>Loading ...</span>}
                            {!taskData.loading && <span>Submit</span>}
                        </button>
                        <button onClick={closeModal} className="btn-close-modal text-center bg-red-500 hover:bg-red-600 transition-all px-3 py-2 rounded-lg text-white">Cancel</button>
                    </div>
                </div>
            </div>}
            <ToastContainer
                position="top-center"
                autoClose={5000} />
        </div >
    );
}

export default AddTask;