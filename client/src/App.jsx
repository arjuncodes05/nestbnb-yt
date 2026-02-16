import NavBar from "./components/NavBar.jsx"
import {Routes, Route, useLocation} from "react-router-dom"
import Home from './pages/Home.jsx'
import Footer from "./components/Footer.jsx"

const App = () => {

  const isOwnerPath = useLocation().pathname.includes("owner")

  return (
    <div>
      { !isOwnerPath && <NavBar/>}
      <div className='min-h-[70vh]'>
        <Routes>
          <Route path="/" element={<Home/>} />
        </Routes>
      </div>
      <Footer/>
    </div>
  )
}

export default App