import React from 'react'

const Navbar = () => {
  return (
    <nav className='flex justify-around bg-[#16a34a] text-white py-9'>
        <div className="logo">
            <span className='font-bold text-xl mx-9'>Daily ToDos</span>
        </div>
      <ul className="flex gap-8 mx-9">
        <li className='cursor-pointer hover:font-bold transition-all duration-75'>Home</li>
        <li className='cursor-pointer hover:font-bold transition-all duration-75'>Your Tasks</li>
      </ul>
    </nav>
  )
}

export default Navbar
