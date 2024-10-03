// import { useState } from 'react';
// import './home.css';
import Complete from './complete';
import Progress from './progress';
import Start from './start';
import AddTask from './add-task';
import { useState } from 'react';

const Home = () => {
    const [showModal, setShowModal] = useState(false);
    const [prgrsValu, setPrgrsValue] = useState(null);
    const openModal = () => {
        setShowModal(true);
        console.log(showModal);
    }
    const handleModalClose = () => {
        setShowModal(false);
    }

    const fromStart = (date) => {
        setPrgrsValue(date);
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
                </div>
                <div className="boards w-full mt-16 h-[460px] flex justify-between">
                    <div>
                        <Start data={fromStart} />
                    </div>
                    <div>
                        <Progress values={prgrsValu} />
                    </div>
                    <div>
                        <Complete />
                    </div>
                </div>
            </div>
            <AddTask showModal={showModal} closeModal={handleModalClose} />
        </div>
    )
}

export default Home;