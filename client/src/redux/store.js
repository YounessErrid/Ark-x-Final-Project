import { configureStore } from '@reduxjs/toolkit'
import userSlice from '../features/userSlice'
import agenciesSlice from '../features/agenciesSlice'
import servicesSlice from '../features/servicesSlice'


export default configureStore({
    reducer: {
        user: userSlice,
        agencies: agenciesSlice,
        services: servicesSlice,
    },
  })