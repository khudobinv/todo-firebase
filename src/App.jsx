import { Home } from "./components/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Main } from "./components/Main";
import { Login } from "./components/Login";
import { Register } from "./components/Register";

export const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </Router>
    </div>
  );
};
