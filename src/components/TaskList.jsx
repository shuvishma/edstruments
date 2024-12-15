import React, { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import { CircleCheck, Filter, Pencil, Trash2 } from "lucide-react";

const TaskList = () => {
  const navigate = useNavigate();
  const { user, tasks, addTask, removeTask, completed, editTask } =
    useContext(UserContext);
  const [task, setTask] = useState("");
  const [flag, setFlag] = useState(false);
  const [filter, setFilter] = useState("all");

  const handleLogout = (e) => {
    e.preventDefault();
    navigate("/");
  };

  const handleAddTask = (e) => {
    e.preventDefault();
    addTask(task);
    setTask({
      title: "",
      status: "",
    });
    setFlag(false);
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    setTask({
      title: value,
      status: "notCompleted",
    });
  };

  const handleDelete = (index) => {
    removeTask(index);
  };

  const handleCompleted = (index) => {
    completed(index);
  };

  const filteredTasks = tasks.filter((task) => {
    console.log(task['status'])
    if (filter === "all") return task; // Show all tasks
    if (filter === "completed") return task['status'] == 'completed'; // Show only completed tasks
    if (filter === "notCompleted") return task["status"] == "notCompleted"; // Show only non-completed tasks
    
  });

  console.log(user)

  return (
    <>
      <div className="flex justify-between align-middle">
        <span className="flex justify-center items-center gap-2">
          <div className="relative w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
            <svg
              className="absolute w-12 h-12 text-gray-400 -left-1"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </div>
          <span>Welcome, {user.username.toUpperCase()}</span>
        </span>
        <button
          className="bg-blue-500 px-6 py-2 rounded-md text-white"
          onClick={handleLogout}
        >
          Logout``
        </button>
      </div>

      <div className="flex gap-2 mt-8">
        <input
          name="task"
          id="task"
          type="text"
          placeholder="Add a task"
          onChange={onChange}
          value={task.title}
          className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
        />
        <button
          className="bg-blue-500 px-6 py-2 rounded-md"
          onClick={handleAddTask}
        >
          {flag ? "Update" : "Add"}
        </button>
      </div>

      <div className="flex justify-end items-center mt-4">
        <label htmlFor="task-filter">Filter Tasks : </label>&nbsp;&nbsp;
        <select
          id="task-filter"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="bg-blue-100 rounded-md p-2"
        >
          <option value="all">All</option>
          <option value="completed">Completed</option>
          <option value="notCompleted">Not Completed</option>
        </select>
      </div>

      <div className="mt-4">
        <ul>
          {filteredTasks.map((list, i) => {
            return (
              <li
                key={i}
                className={`flex justify-between mt-2 list-disc bg-blue-100 p-4 rounded-md`}
              >
                <span
                  className={`flex justify-center items-center font-semibold ${
                    list.status == "completed" ? "line-through" : ""
                  }`}
                >
                  {list.title}
                </span>

                <div className="flex gap-2">
                  <button
                    className="bg-green-500 rounded-md px-6 py-2 flex"
                    onClick={() => handleCompleted(i)}
                  >
                    <CircleCheck />
                    Mark as completed
                  </button>
                  <button
                    className="bg-blue-500 rounded-md px-6 py-2 flex"
                    onClick={() =>
                      editTask(i, prompt("Edit task title:", list.title))
                    }
                  >
                    <Pencil />
                    Update
                  </button>
                  <button
                    className="bg-red-500 rounded-md px-6 py-2 flex"
                    onClick={() => handleDelete(i)}
                  >
                    <Trash2 />
                    Delete
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
};

export default TaskList;
