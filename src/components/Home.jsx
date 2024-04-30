import React from 'react'
import { Link } from 'react-router-dom'

function Home() {
  return (
    <div className='w-full h-full flex flex-col flex-wrap absolute justify-center items-center gap-10'>
      <h1 className='absolute top-10 text-3xl font-sans font-bold text-violet-900 underline'>Welcome To Resume Live</h1>
      <div className='w-full flex gap-10 justify-center '>
        <Link to='/form' className=' flex justify-center items-center w-52 h-16 bg-violet-700 hover:bg-violet-800 text-orange-300 text-xl font-semibold rounded-2xl '>Go to User</Link>
        <Link to='/admin' className=' flex justify-center items-center w-52 h-16 bg-violet-700 hover:bg-violet-800 text-orange-300 text-xl font-semibold rounded-2xl '>Go to Admin</Link>
      </div>
    </div>
  )
}

export default Home
