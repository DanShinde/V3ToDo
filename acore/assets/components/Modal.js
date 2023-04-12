import { useState } from "react";
import axios from 'axios';
import React from 'react';


const Modal = ({mode, setShowModal, getData, task})=> {


    const editMode = mode === 'edit' ? true : false

    const [data, setData] = useState({
        title: editMode ? task.title : null,
        progress: editMode ? task.progress : 50,
        user: "1"
    })

    const postData = async (e) => {
        e.preventDefault()        
        try {
            const response = await fetch (URLS.addnew,  {
                method: "POST",
                headers: { 
                    'Content-Type': 'application/json',
                    'X-CSRFToken': csrf_token
                },
                body: JSON.stringify(data)
            })
            if (response.status === 200) {
                console.log("ToDo Added")
                setShowModal(false)
                getData()
                // TODO: handle successful response
            } else {
                throw new Error('Failed to create ToDo item');
            }
        } catch (err) {
            console.error(err)
        }
    }
    
    
    const editData = async (e) => {
        e.preventDefault()
        const updateurl = URLS.update.replace('0', task.id)
        console.log(updateurl)
        try {
            const response = await fetch(updateurl, {
                method: 'PUT',
                headers: { 
                    'Content-Type': 'application/json',
                    'X-CSRFToken': csrf_token
                },
                body: JSON.stringify(data)
            })
            if (response.status===200) {
                setShowModal(false)
                getData()
            }
        } catch (err) {
            console.log(err)
        }

    }

    const handleChange= (e)=> {
        const {name, value} = e.target

        setData(data =>({
            ...data,
            [name]: value
        }))

        // console.log(data)
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
                    <input className={mode} type= "submit" onClick={editMode? editData : postData} />
                    
                </form>
            </div>

        </div>
    )
}
export default Modal

