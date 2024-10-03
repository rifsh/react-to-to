import React, { useEffect, useState } from 'react';
import AddTask from './add-task';
import { useTodo } from '../hooks/useTodos';

const TodoList = () => {
    const [showModal, setShowModal] = useState(false);
    const { tasks } = useTodo(localStorage.getItem('userId'), showModal);

    const openModal = () => {
        setShowModal(true);
    }
    const handleModalClose = () => {
        setShowModal(false);
    }


    return (
        <div className="h-[100vh] flex justify-center items-center">
            <div className='min-w-[800px] '>
                <div className='top mt-5 flex items-end justify-between flex-wrap flex-shrink-0'>
                    <div className=''>
                        <h1 className='text-4xl font-medium'>My Todo</h1>
                        <input type="text" className='border-2 border-blue-200 mt-5 rounded-md py-1 px-3 w-40 focus:outline-none transition-all' placeholder='Search' />
                    </div>
                    <div className='flex flex-col items-end'>
                        <button className='bg-gray-700 text-white py-2 px-4 rounded-lg' onClick={openModal}>New task</button>
                        <div className='mt-5'>
                            <input type="date" className='border-2 border-blue-200 rounded-md py-1 px-3 me-2' />
                            <input type="date" className='border-2 border-blue-200 rounded-md py-1 px-3' />
                        </div>
                    </div>
                    <div className="container mx-auto p-4">
                        <h1 className="text-2xl font-semibold mb-6 text-center">Task List</h1>

                        <div className="overflow-x-auto">
                            <table className="min-w-full table-auto border-collapse border border-gray-300">
                                <thead>
                                    <tr className="bg-gray-200">
                                        <th className="px-4 py-2 text-left font-medium text-gray-600 border border-gray-300">#</th>
                                        <th className="px-4 py-2 text-left font-medium text-gray-600 border border-gray-300">Title</th>
                                        <th className="px-4 py-2 text-left font-medium text-gray-600 border border-gray-300">Description</th>
                                        <th className="px-4 py-2 text-left font-medium text-gray-600 border border-gray-300">Due Date</th>
                                        <th className="px-4 py-2 text-left font-medium text-gray-600 border border-gray-300">Completed</th>
                                        <th className="px-4 py-2 text-center font-medium text-gray-600 border border-gray-300">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {tasks.map((x) => (
                                        <tr className="bg-white hover:bg-gray-50" key={x._id}>
                                            <td className="px-4 py-2 border border-gray-300">1</td>
                                            <td className="px-4 py-2 border border-gray-300">{x.title}</td>
                                            <td className="px-4 py-2 border border-gray-300">{x.descriotion}</td>
                                            <td className="px-4 py-2 border border-gray-300">{x.dueDate}</td>
                                            {x.status === "Pending" && <td className="px-4 py-2 border border-gray-300">
                                                <span className="text-red-500">No</span>
                                            </td>}
                                            {x.status === "completed" && <td className="px-4 py-2 border border-gray-300">
                                                <span className="text-green-500">Yes</span>
                                            </td>}
                                            <td className="px-4 py-2 text-center border border-gray-300">
                                                <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">Edit</button>
                                                <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition ml-2">Delete</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

            </div>
            <AddTask showModal={showModal} closeModal={handleModalClose} />
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