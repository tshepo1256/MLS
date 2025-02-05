// TaskList.js
import React, { useState } from 'react';
import './TaskList.css';

const TaskList = ({ data, onUpdate }) => {
  const [localData, setLocalData] = useState(data);
  const [task, setTask] = useState('');

  const handleTaskChange = (e) => {
    setTask(e.target.value);
  };

  const addTask = () => {
    setLocalData((prevData) => [...prevData, task]);
    setTask('');
  };

  const handleSave = () => {
    onUpdate(localData);
  };

  return (
    <div className="task-list">
      <h2>Task List</h2>
      <div>
        <label>Task:</label>
        <input
          type="text"
          value={task}
          onChange={handleTaskChange}
          placeholder="Enter task description"
        />
        <button onClick={addTask}>Add Task</button>
      </div>
      <div className="task-items">
        {localData.map((t, index) => (
          <div key={index}>{t}</div>
        ))}
      </div>
      <button onClick={handleSave}>Save and Continue</button>
    </div>
  );
};

export default TaskList;
