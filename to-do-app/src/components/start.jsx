import { useState } from "react";

const Start = ({ data }) => {

    const [items, setItems] = useState([]);
    const [draggingItem, setDraggingItem] = useState(null);
    const [value, setValue] = useState(null);
    const [tasks, setTasks] = useState([]);

    const handleDragStart = (e, index) => {
        setDraggingItem(index);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const handleDrop = (e, index) => {
        const copiedItems = [...items];
        const [removedItem] = copiedItems.splice(draggingItem, 1); // Remove the dragged item
        copiedItems.splice(index, 0, removedItem); // Insert at the new position
        setItems(copiedItems);
        setValue(copiedItems);
        data(removedItem)        
        setDraggingItem(null); // Reset dragging state
    };

    return (
        <div>
            <div className='flex items-center justify-start mb-3'>
                <div className='h-3 w-3 bg-blue-400 rounded-full me-2'></div>
                <h1>To Start</h1>
            </div>
            <div className='bg-[#eaf5f9] w-64 h-[460px] rounded-lg px-2 py-2 overflow-scroll overflow-x-hidden overflow-y-auto'>
                {items.map((X, i) => {
                    return <div className='bg-white rounded-lg h-[120px] px-2 py-2 mb-2 cursor-pointer border-[2px] border-blue-200' draggable onDragStart={(e) => handleDragStart(e, i)} onDragOver={handleDragOver} key={i} onDrop={(e) => handleDrop(e, i)}>
                        <h1>{X}</h1>
                    </div>
                })}
            </div>
        </div>
    );
}

export default Start;