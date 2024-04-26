import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Main } from "./views/Main";
import { Dashboard } from "./views/Dashboard";
import Login from "./views/Login";
import Protected from "./routes/Protected";
import Alert from "./components/Alert";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<Protected />}>
          <Route path="/dashboard/*" element={<Dashboard />} />
        </Route>
      </Routes>
      <Alert status={"success"} msg={"the portfolio add successfully"} />
    </>
  );
}

export default App;
