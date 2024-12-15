import { createContext, useState } from "react";
import WarningToast from "../components/WarningToast";
import { useNavigate } from "react-router-dom";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [tasks, setTasks] = useState(() => {
    const savedTasks = user
      ? localStorage.getItem(`tasks_${user.username}`)
      : null;
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  const signup = (userData) => {
    setUser(userData);
    localStorage.setItem(`user_${userData.username}`, JSON.stringify(userData));
    const savedTasks = localStorage.getItem(`tasks_${userData.username}`);
    setTasks(savedTasks ? JSON.parse(savedTasks) : []);
  };

  const login = (userData) => {
    console.log(localStorage.getItem(`user_${userData.username}`));
    if(localStorage.getItem(`user_${userData.username}`)) {
      setUser(userData);
      const savedTasks = localStorage.getItem(`tasks_${userData.username}`);
      setTasks(savedTasks ? JSON.parse(savedTasks) : []);
      return true
    }
    else {
      return false
    }
  }

  const addTask = (task) => {
    const updatedTasks = [...tasks, task];
    setTasks(updatedTasks);
    localStorage.setItem(
      `tasks_${user.username}`,
      JSON.stringify(updatedTasks)
    );
  };

  const removeTask = (taskIndex) => {
    const updatedTasks = tasks.filter((_, index) => index !== taskIndex);
    setTasks(updatedTasks);
    localStorage.setItem(
      `tasks_${user.username}`,
      JSON.stringify(updatedTasks)
    );
  };

  const editTask = (id, newTitle) => {
    const update = tasks.map((task, index) =>
      index === id ? { ...task, title: newTitle } : task
    );
    setTasks(update);
    localStorage.setItem(`tasks_${user.username}`, JSON.stringify(update));
  };

  const completed = (taskIndex) => {
    const updatedTasks = tasks.map((t, index) =>
      index == taskIndex ? { ...t, status: "completed" } : t
    );
    setTasks(updatedTasks);
    localStorage.setItem(
      `tasks_${user.username}`,
      JSON.stringify(updatedTasks)
    );
  };

  return (
    <UserContext.Provider
      value={{
        user,
        login,
        tasks,
        addTask,
        removeTask,
        completed,
        editTask,
        signup
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
