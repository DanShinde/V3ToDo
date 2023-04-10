import TickIcon from './TickIcon'
import ProgressBar from './ProgressBar'
import axios from 'axios'
// import Button from '@mui/material/Button';
import { useState } from 'react';
import Modal from "./Modal";
import React from 'react';


const ListItem = ({task})=> {
    const todourl = URLS.todo.replace('0', task.id)
    const [showModal, setShowModal] = useState(false)
    const handleDelete = async () => {
        try {
            await axios.delete(todourl, {
                headers: {
                    'X-CSRFToken': csrf_token
                }
            });
            // Refresh tasks list after deletion
            console.log("Deleted")
            window.location.reload()
        } catch (err) {
            console.error(err)
        }
    }

    return (
        <li className="list-item" >
            <div className="info-container">
                <TickIcon />
                <p className="task-title">{task.title} </p>
                <ProgressBar />
            </div> 
            <div className="button-container">
                <button className='edit' onClick={() => setShowModal(true)}>EDIT</button>
                {/* <Button className='delete' variant="outline" color="danger" onClick={handleDelete}>DELETE</Button> */}
                <button className='delete' onClick={handleDelete}> <strong>DELETE</strong></button>
            </div>
            {showModal && <Modal mode={'edit'} setShowModal={setShowModal} task={task} />}
        </li>
    )
}
export default ListItem