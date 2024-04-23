import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Main } from "./views/Main";
import { Dashboard } from "./views/Dashboard";
import Login from "./views/Login";
import Protected from "./routes/Protected";

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route element={<Protected />}>
          <Route path="/dashboard/*" element={<Dashboard />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
