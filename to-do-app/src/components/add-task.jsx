import * as React from 'react';
import { useState } from 'react';
import './add-task.css'
import { taskService } from '../services/task.service';
import { toast, ToastContainer } from 'react-toastify';

const AddTask = ({ showModal, closeModal }) => {
    const [open, setOpen] = useState(false);

    const [taskDate, settaskDate] = useState({
        title: '',
        descriotion: '',
        priority: 'low',
        dueDate: ''
    })

    if (!showModal) {
        return null;
    }

    const addTask = async () => {
        let userId = localStorage.getItem('userId');
        try {
            const data = await taskService.addTask(taskDate, userId);
            if (data.data.message === 'Success') {
                toast.success('Task added');
                closeModal();
            } else {
                toast.warning("Something went wrong")
            }
        } catch (error) {
            console.log(error);
            toast.warning("Something went wrong")
        }
    }

    return (
        <div>
            <div className="modal-backdrop flex flex-grow">
                <div className="modal-content min-w-[500px] bg-white rounded-xl py-3 px-5 flex items-start justify-center flex-col">
                    <div className='w-full flex items-center justify-center'>
                        <h2 className='text-3xl text-gray-400'>Add new task</h2>
                    </div>
                    <div className="w-full">
                        <form action="" className='flex flex-col h-[350px] justify-between mt-2'>
                            <div className='flex flex-col'>
                                <label htmlFor="" className='mb-1'>Name</label>
                                <input
                                    onChange={(e) => { settaskDate({ ...taskDate, title: e.target.value }) }}
                                    className='py-2 px-3 border border-gray-300 bg-white rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out'
                                    type="text"
                                    placeholder='Task name' />
                                {taskDate.title === '' && <div className='text-red-600 text-sm'>* Title is required</div>}
                            </div>
                            <div className='flex flex-col'>
                                <label htmlFor="" className='mb-1'>Description</label>
                                <textarea
                                    name=""
                                    onChange={(e) => settaskDate({ ...taskDate, descriotion: e.target.value })}
                                    className='py-2 px-3 border border-gray-300 bg-white rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out'
                                    id=""></textarea>
                            </div>
                            <div className="">
                                <label htmlFor="priority" className="block text-sm font-medium text-gray-700 mb-2">Select Priority</label>
                                <select onChange={(e) => { settaskDate({ ...taskDate, priority: e.target.value }) }} id="priority" name="priority" className="block w-full py-2 px-3 border border-gray-300 bg-white rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out">
                                    <option value="low">Low</option>
                                    <option value="medium">Medium</option>
                                    <option value="high">High</option>
                                </select>
                            </div>
                            <div className='flex flex-col'>
                                <label htmlFor="" className='mb-1'>Due date</label>
                                <input
                                    className='py-2 px-3 border border-gray-300 bg-white rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out'
                                    onChange={(e) => settaskDate({ ...taskDate, dueDate: e.target.value })}
                                    type="date"
                                    placeholder='Task due date' />
                            </div>
                        </form>
                    </div>
                    <div className='flex justify-center w-full mt-4'>
                        <button onClick={addTask} className="me-3 text-center btn-close-modal bg-green-500 hover:bg-green-600 transition-all px-4 py-2 rounded-lg text-white">Add</button>
                        <button onClick={closeModal} className="btn-close-modal text-center bg-red-500 hover:bg-red-600 transition-all px-3 py-2 rounded-lg text-white">Cancel</button>
                    </div>
                </div>
            </div>
            <ToastContainer
                position="top-center"
                autoClose={5000} />
        </div>
    );
}

export default AddTask;