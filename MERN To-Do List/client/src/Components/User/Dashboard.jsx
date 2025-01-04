import React from 'react'
import TaskChart from '../Task/TaskChart'

const Dashboard = () => {
  return (
    <div className='m-5 shadow-5xl p-10 max-h-1/2 text-center bg-orange-100 rounded-md text-black flex flex-col items-center justify-center p-20 max-w-5xl rounded-md mx-auto '>
      <h1 className='text-5xl font-bold mb-4'>
        Welcome to your Dashboard!
      </h1>
      <p className='text-2xl m-8 font-bold text-green-500 '>
        Graphical representation of your tasks details.
      </p>
      <TaskChart />
    </div>

  )
}

export default Dashboard