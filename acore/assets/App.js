import './App.css';
// import 'bootstrap/dist/css/bootstrap.min.css';
import {useState, useEffect} from "react";
import ListItem from './components/ListItem';
import axios from "axios";
import Auth from './components/Auth';
import ListHeader from './components/ListHeader';
import React from 'react';

function App() {
  const [tasks, setTasks] = useState(null)
  const list = URLS.list;
  
  const authToken = true;

  const getData = async () =>{
    try {
      const response = await axios.get(list)       //('https://reacttodo.pythonanywhere.com/')    
      const json = await response.data
      setTasks(json)
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    if (authToken) {
      getData()
    }}
    ,[])
  console.log(tasks)


  return (
    <div className="App">
      {!authToken && <Auth/> }
      {authToken && 
      <>
      <ListHeader listName={' 🚀 Holiday TickList'} getData={getData} />
      {tasks?.map((task) => <ListItem key={task.id} task={task} getData={getData} />)}
      </>}
    </div>
  );
}

export default App;
