import { useState } from 'react';
import './Style.css'

interface Task {
    id: string;
    text: string;
    completed: boolean;
}

const AddTaskForm = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [newTask, setNewTask] = useState ('');

    const addTask = () => {
        if (newTask !== '') {
            const newId = crypto.randomUUID ();
            const newTaskItem: Task = {
                id: newId,
                text: newTask,
                completed: false,
            };
            setTasks([...tasks, newTaskItem]);
            setNewTask('');
        }
    };

    const removeTask = (id: string) => {
        const updatedTodos = tasks.filter((task) => task.id !== id);
        setTasks(updatedTodos);
    };

    const toggleComplete = (id: string) => {
        const updatedTodos = tasks.map((task) => {
            if (task.id === id) {
                return { ...task, completed: !task.completed };
            }
            return task;
        });
        setTasks(updatedTodos);
    };

    return (
        <div>
            <input className="input"
                type="text"
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
            />
            <button onClick={addTask}>Add</button>

            <ul className="list">
                <li className="task">
                    <input
                        type="checkbox"
                    />
                    <span>
                        Create homework for Attractor
                    </span>
                    <button>Delete</button>
                </li>
                <li className="task">
                    <input
                        type="checkbox"
                    />
                    <span>
                        Export homework to Github
                    </span>
                    <button>Delete</button>
                </li>
                {tasks.map((task) => (
                    <li className="task" key={task.id}>
                        <input
                            type="checkbox"
                            checked={task.completed}
                            onChange={() => toggleComplete(task.id)}
                        />
                        <span style={{textDecoration: task.completed ? 'line-through' : 'none'}}>
                            {task.text}
                        </span>
                        <button onClick={() => removeTask(task.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AddTaskForm;