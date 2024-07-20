import React, { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../components/frontOffice/AgencyHeader'
import { Footer } from '../components/frontOffice/Footer'
import { Spinner } from '../components/Spinner'
import { useSelector } from 'react-redux'
import ClientHeader from '../components/frontOffice/ClientHeader'

export const Front = () => {
  const { loading, user } = useSelector((state) => state.user);

  

  // Return loading spinner if loading is true and data is not loaded yet
  if (loading) {
    return <Spinner loaded={!loading} />;
  }

  // useEffect(()=>{
  //   console.log("user", user);
  // }, [user])
  
  return (
    <div className='min-h-screen min-w-screen  bg-whiteDirty'>
      <div className="text-center bg-secondary text-white py-2">Follow Us in our Social Media</div>
      {user?.role === "agency" && (<Header />)}
      {user?.role === "client" && (<ClientHeader />)}
      <Outlet />
      <Footer />
    </div>
  )
}
