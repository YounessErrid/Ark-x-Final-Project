import { configureStore } from "@reduxjs/toolkit";
import userSlice from "../features/userSlice";
import agenciesSlice from "../features/agenciesSlice";
import servicesSlice from "../features/servicesSlice";
import subscriptionsSlice from "../features/subscriptionsSlice";
import paymentsSlice from "../features/paymentsSlice";

export default configureStore({
  reducer: {
    user: userSlice,
    agencies: agenciesSlice,
    services: servicesSlice,
    subscriptions: subscriptionsSlice,
    payments: paymentsSlice,
  },
});
