import { useState } from "react";
import axios from 'axios';
import React from 'react';


const Modal = ({mode, setShowModal, task})=> {


    const editMode = mode === 'edit' ? true : false

    const [data, setData] = useState({
        title: editMode ? task.title : null,
        progress: editMode ? task.progress : 50,
        user: "1"
    })

    const postData = async (e) => {
        e.preventDefault()        
        try {
            await axios.post(`http://localhost:8000/todo/`, data, {
                headers: {'Content-Type': 'application/json' },
            })
            // Refresh tasks list after creation or update
            setShowModal(false)
            window.location.reload(false)
        } catch (err) {
            console.error(err)
        }
    }
    

    const handleChange= (e)=> {
        const {name, value} = e.target

        setData(data =>({
            ...data,
            [name]: value
        }))

        console.log(data)
    }
    return (
        <div className="overlay">
            <div className="modall">
                <div className="form-title-container">
                    <h3>Let's {mode} your task</h3>
                    <button onClick={() => setShowModal(false)}>X</button>
                </div>
                <form>
                    <input required
                    maxLength={30} 
                    placeholder="Your Task Title"
                    name="title"
                    value={data.title}
                    onChange= {handleChange}   />
                    <br />
                    <label htmlFor="range">Drag to select your current progress</label>
                    <input 
                    required
                    type="range"
                    id="range"
                    min="0"
                    max="100"
                    name="progress"
                    value={data.progress}
                    onChange={handleChange} />
                    <input className={mode} type= "submit" onClick={editMode? '': postData} />
                    
                </form>
            </div>

        </div>
    )
}
export default Modal

