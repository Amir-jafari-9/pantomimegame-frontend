import React from 'react'

const Page = () => {
  return (
    <main className="p-5 flex  flex-col text-center gap-16 bg-gradient-to-b from-purple-300 to-purple-50 h-screen">
        <h1 className='flex gap-4 text-center justify-center text-purple-800 font-bold py-16'> 
          <p> دسته‌بندی غذا</p>
          <p> | </p>
          <p> ۵ امتیاز </p>
           </h1>
        <section className='flex justify-center flex-col items-center text-center gap-36'>
            <p className="bg-white/40  text-purple-800 p-20 w-max py-22  rounded-full font-semibold"> کلمه </p>
        <button className='bg-gradient-to-r from-purple-600 to-purple-800 p-4 rounded-xl w-max justify-center px-12 flex text-white '> بزن بریم!</button>
        </section>


        
    </main>
  )
}

export default Page