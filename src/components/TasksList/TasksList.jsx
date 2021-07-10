import { useEffect, useState } from "react";
import PopUp from "../PopUp/PopUp.jsx";
import "./TasksList.scss";
import { nanoid } from "nanoid";
import ListItem from "./ListItem.jsx";

const TasksList = () => {
  const [tasks, setTasks] = useState([]);

  const addTaskHandler = taskText => {
    const newTask = {
      taskText: taskText.trim(),
      done: false,
      id: nanoid(),
      creationDate: Date.now(),
    }

    setTasks(prevState => {
      const arrCopy = [...prevState];
      arrCopy.unshift(newTask);
      return arrCopy;
    });
  }
  const changeTaskStatusHandler = taskId => {
    setTasks(prevState => {
      const updatedList = prevState.map(task => {
        if (task.id === taskId) {
          return {
            ...task,
            done: !task.done
          }
        }
        return task;
      });
      return updatedList;
    });
  }
  const deleteTaskHandler = taskId => {
    setTasks(prevState => {
      const updatedList = prevState.filter(task => task.id !== taskId);
      return updatedList;
    });
  }

  useEffect(() => {
    const tasks = JSON.parse(localStorage.getItem('tasks'));
    if (!tasks || tasks.length === 0) return;
    setTasks(tasks);
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  return (
    <>
      <PopUp addTaskHandler={addTaskHandler} />

      {tasks.length === 0 ? (
        <span>no one task</span>
      ) : (
        <ul className="tasks-list">
          {tasks.map(task => (
            <ListItem
              key={task.id}
              id={task.id}
              done={task.done}
              creationDate={task.creationDate}
              taskText={task.taskText}
              changeTaskStatusHandler={changeTaskStatusHandler}
              deleteTaskHandler={deleteTaskHandler}
            />
          ))}
        </ul>
      )}
    </>
  );
}

export default TasksList;