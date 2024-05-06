import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Main } from "./views/Main";
import { Dashboard } from "./views/backOffice/Dashboard";
import Login from "./views/Login";
import Register from "./views/Register";
import Protected from "./routes/Protected";
import ForgetPassword from "./views/ForgetPassword";
import EmailSent from "./views/EmailSent";
import ResetPassword from "./views/ResetPassword";

function App() {
  return (
    <div data-theme="dark">
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgetPassword" element={<ForgetPassword />} />
        <Route path="/emailSent" element={<EmailSent />} />
        <Route path="/resetPassword/:token" element={<ResetPassword />} />
        <Route element={<Protected />}>
          <Route path="/dashboard/*" element={<Dashboard />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
