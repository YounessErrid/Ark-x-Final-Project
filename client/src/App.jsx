import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Home } from "./views/frontOffice/Home";
import { Dashboard } from "./views/backOffice/Dashboard";
import Login from "./views/Login";
import Register from "./views/Register";
import Protected from "./routes/Protected";
import ForgetPassword from "./views/ForgetPassword";
import EmailSent from "./views/EmailSent";
import ResetPassword from "./views/ResetPassword";
import { Contact } from "./views/frontOffice/Contact";
import { Front } from "./views/Front";
import { Agencies } from "./views/frontOffice/Agencies/Agencies";
import RegisterAgency from "./views/RegisterAgency";

function App() {

  return (
    <div data-theme="dark">
      <Routes>
        <Route path="/" element={<Front />} >
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/agenciespage" element={<Agencies />} />

        </Route>
        
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/agency/register" element={<RegisterAgency />} />
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
