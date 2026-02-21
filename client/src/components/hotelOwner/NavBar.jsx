import {Link} from 'react-router-dom'
import {assets} from "../../assets/assets"
import {UserButton} from "@clerk/clerk-react"

const NavBar = () => {
  return (
    <div className='flex items-center justify-between px-4 md:px-8 border-b border-gray-300 py-3 bg-white transition-all duration-300'>
      <Link to='/' className='flex gap-2 items-center'>
        <img src={assets.logo} alt="logo" className='h-12 opacity-80' />
        <p className={`font-semibold  text-xl lg:text-3xl opacity-90`}>Nestbnb</p>
      </Link>
      <UserButton/>
    </div>
  )
}

export default NavBar