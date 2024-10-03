import { useState } from "react";

const Progress = ({ values }) => {
    const [progress, setProgressItems] = useState(['task1']);
    if (values) {
        progress.push(values)
        console.log(progress);
    }
    return (
        <div>
            <div className='flex items-center justify-start mb-3'>
                <div className='h-3 w-3 bg-yellow-400 rounded-full me-2'></div>
                <h1>{values}</h1>
            </div>
            <div className='bg-[#eaf5f9] w-64 h-[460px] rounded-lg px-2 py-2 overflow-scroll overflow-x-hidden overflow-y-hidden'>
                {progress.map((X, i) => {
                    return <div key={i} className='bg-white rounded-lg h-[120px] px-2 py-2 mb-2 cursor-pointer border-[2px] border-blue-200' draggable >
                        <h1>{X}</h1>
                    </div>
                })}
            </div>
        </div>
    );
}

export default Progress