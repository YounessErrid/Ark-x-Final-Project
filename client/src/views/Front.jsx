import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../components/frontOffice/Header'
import { Footer } from '../components/frontOffice/Footer'

export const Front = () => {
  return (
    <div className='min-h-screen min-w-screen bg-whiteDirty'>
      <div className="text-center bg-secondary text-white py-2">Follow Us in our Social Media</div>
      <Header />
      <Outlet />
      <Footer />
    </div>
  )
}
