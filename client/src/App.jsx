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
import Subscription from "./views/frontOffice/Subscription";
import SuccessPage from "./views/frontOffice/SuccessPage";
import { checkSession } from "./features/userSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import Portfolio from "./views/frontOffice/Agencies/Portfolio";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    // Dispatch checkSession action on component mount
    dispatch(checkSession());
  }, [dispatch]);

  return (
    <div data-theme="dark">
      <Routes>
        <Route path="/" element={<Front />}>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/agenciespage" element={<Agencies />} />
          <Route path="/portfolio/:id" element={<Portfolio />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/subscription" element={<Subscription />} />
        <Route path="/successful-payment" element={<SuccessPage />} />
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
