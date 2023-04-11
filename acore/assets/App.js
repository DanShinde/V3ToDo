import './App.css';
// import 'bootstrap/dist/css/bootstrap.min.css';
import {useState, useEffect} from "react";
import ListItem from './components/ListItem';
import axios from "axios";
import ListHeader from './components/ListHeader'
import React from 'react';

function App() {
  const [tasks, setTasks] = useState(null)
  const list = URLS.list;
  

  const getData = async () =>{
    try {
      const response = await axios.get(list)       //('https://reacttodo.pythonanywhere.com/')    
      const json = await response.data
      setTasks(json)
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => getData,[])
  console.log(tasks)


  return (
    <div className="App">
      <ListHeader listName={' 🚀 Holiday TickList'} getData={getData} />
      {tasks?.map((task) => <ListItem key={task.id} task={task} getData={getData} />)}

    </div>
  );
}

export default App;
