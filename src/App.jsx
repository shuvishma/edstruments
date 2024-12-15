import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import TaskList from "./components/TaskList";
import { UserProvider } from "./context/UserContext.jsx";
import WarningToast from "./components/WarningToast.jsx";

function App() {
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/task" element={<TaskList />} />
          <Route path="/error" element={<WarningToast />} />
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;
