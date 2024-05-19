import { configureStore } from "@reduxjs/toolkit";
import userSlice from "../features/userSlice";
import agenciesSlice from "../features/agenciesSlice";
import servicesSlice from "../features/servicesSlice";
import subscriptionsSlice from "../features/subscriptionsSlice";
import paymentsSlice from "../features/paymentsSlice";
import clientsSlice from "../features/clientsSlice";
import adminsSlice from "../features/adminsSlice";
import statisticSlice from "../features/statsSlice"

export default configureStore({
  reducer: {
    user: userSlice,
    admins: adminsSlice,
    agencies: agenciesSlice,
    clients: clientsSlice,
    services: servicesSlice,
    subscriptions: subscriptionsSlice,
    payments: paymentsSlice,
    statistics: statisticSlice,
  },
});
