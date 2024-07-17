import React, { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../components/frontOffice/Header'
import { Footer } from '../components/frontOffice/Footer'
import { Spinner } from '../components/Spinner'
import { useSelector } from 'react-redux'

export const Front = () => {
  const { loading } = useSelector((state) => state.user);

  

  // Return loading spinner if loading is true and data is not loaded yet
  if (loading) {
    return <Spinner loaded={!loading} />;
  }
  return (
    <div className='min-h-screen min-w-screen  bg-whiteDirty'>
      <div className="text-center bg-secondary text-white py-2">Follow Us in our Social Media</div>
      <Header />
      <Outlet />
      <Footer />
    </div>
  )
}
