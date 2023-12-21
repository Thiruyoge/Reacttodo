import "./App.css";
import React, { useState, useEffect } from 'react';
import jsonData from './data.json';




function App() {
const [data, setData] = useState([]);
useEffect(() => {
    // Set the local JSON data to the state variable
 setData(jsonData.task);
  }, []);

// State variables to hold user input
const [newItemName, setNewItemName] = useState('');
const [newItemDescription, setNewItemDescription] = useState('');
const [newItemStatus,setNewItemStatus] = useState('');
const [Completed] = useState('completed');
const [NotCompleted] = useState('not completed');


   // State variables to hold user input for editing
   const [editItemId, setEditItemId] = useState(0);
   const [editedItemStatus, seteditedItemStatus] = useState('');

// Function to handle form submission and add user-entered data to the array
const handleFormSubmit = (event) => {
  event.preventDefault();

  // Check if both name and description are entered
  if (newItemName.trim() === '' || newItemDescription.trim() === '') {
    alert('Please enter both name and description.');
    return;
  }

  const newItem = {
    id: data.length + 1, // Generate a new unique ID
    name: newItemName,
    description: newItemDescription,
  };

  // Update the state by combining the existing data with the new item
  setData((prevData) => [...prevData, newItem]);

  // Clear the input fields after adding the item
  setNewItemName('');
  setNewItemDescription('');


  
};

const updateStatus = (taskId, newStatus) => {
  // Find the task index in the array
  const taskIndex = data.findIndex((task) => task.id === taskId);

  // Update the status of the task
  setData((prevTasks) => [
    ...prevTasks.slice(0, taskIndex),
    { ...prevTasks[taskIndex], status: newStatus },
    ...prevTasks.slice(taskIndex + 1),
  ]);
};


const deleteTask = (taskId) => {
  // Filter out the task with the specified ID
  setData((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
};

  return (
    <>
      <div class="container">
        <div class="card mt-5 border-0">
          <h3 class="text-center">My ToDo</h3>
          <form onSubmit={handleFormSubmit}>
          <div class="row">
            <div class="col">
               <input
                type="text"
                class="form-control"
                value={newItemName}
                onChange={(e) => setNewItemName(e.target.value)}
                placeholder="Task name"
                aria-label="Task name"
              />
            </div>
            <div class="col">
              <input
                type="text"
                class="form-control"
                value={newItemDescription}
                onChange={(e) => setNewItemDescription(e.target.value)}
                placeholder="Task Description"
                aria-label="Task Description"
              />
            </div>
          </div>
          <div class="col-4 mt-2 ">
            <button type="submit" class="btn btn-success"  value="Add Task">
              Add
            </button>
          </div>
          </form>
        </div>

        <div class="card border-0">
          <h3 class="text-center">My ToDo List's</h3>

          <div class="row row-cols-1 row-cols-md-3 g-4">

          {data.map(item => (      
            


            <div class="col">
              <div class="card w-75">
                <div class="card-body">
                  <h5 class="card-title">{item.name}</h5>
                  <p class="card-text">{item.description}</p>
                  

                
    {Completed === item.status ? <h3 class="text-success">Completed</h3> 
      : NotCompleted === item.status ? <h3 class="text-danger">NotCompleted</h3>
 
      :  <div>
      <button className="btn btn-sm btn-outline-success" onClick={() => updateStatus(item.id, 'completed')}>Completed</button>
      <button className="btn btn-sm btn-outline-danger" onClick={() => updateStatus(item.id, 'not completed')}>Not Completed</button>
    </div> }
  

         
                 
                  <button
                    style={{ Align: "right" }}
                    class="btn btn-sm btn-danger float-end"
                    onClick={() => deleteTask(item.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>))}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
