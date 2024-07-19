import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Home } from "./views/frontOffice/Home";
import { Dashboard } from "./views/backOffice/Dashboard";
import Login from "./views/Login";
import Register from "./views/Register";
import Protected from "./routes/ProtectedAdmin";
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
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Portfolio from "./views/frontOffice/Agencies/Portfolio";
import Portfolio2 from "./views/frontOffice/Agencies/Portfolio2";
import AgencyProfile from "./views/frontOffice/Agencies/AgencyProfile";
import ServiceDetails from "./views/frontOffice/Agencies/serviceDetails";
import ProtectedAgency from "./routes/ProtectedAgency";
import { Spinner } from "./components/Spinner";
import PortfolioView from "./views/frontOffice/Clients/PortfolioView";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    // Dispatch checkSession action on component mount
    dispatch(checkSession());
  }, [dispatch]);

  const { loading } = useSelector((state) => state.user);
  const [dataLoaded, setDataLoaded] = useState(false);

  useEffect(() => {
    if (!loading) {
      setTimeout(() => {
        setDataLoaded(true);
      }, 1000);
    }
  }, [loading]);

  // Return loading spinner if loading is true and data is not loaded yet
  if (!dataLoaded) {
    return <Spinner loaded={dataLoaded} />;
  }

  return (
    <div data-theme="dark">
      <Routes>
        <Route path="/" element={<Front />}>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/agenciespage" element={<Agencies />} />
          <Route
            path="/service-details/:portfolioServiceId"
            element={<ServiceDetails />}
          />
          <Route path="/client/portfolio/:id" element={<PortfolioView />} />


        {/* agency routes */}
          <Route element={<ProtectedAgency />}>
            <Route path="/portfolio/:id/*" element={<Portfolio2 />} />
            <Route path="/agency/profile/:id" element={<AgencyProfile />} />
          </Route>
        </Route>

        {/* auth routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/subscription" element={<Subscription />} />
        <Route path="/successful-payment" element={<SuccessPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/agency/register" element={<RegisterAgency />} />
        {/* email routes */}
        <Route path="/forgetPassword" element={<ForgetPassword />} />
        <Route path="/emailSent" element={<EmailSent />} />
        <Route path="/resetPassword/:token" element={<ResetPassword />} />
        {/* admin routes */}
        <Route element={<Protected />}>
          <Route path="/dashboard/*" element={<Dashboard />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
