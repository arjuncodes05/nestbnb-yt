import React from 'react'
import NavBar from "./components/NavBar.jsx"
import {useLocation} from "react-router-dom"

const App = () => {

  const isOwnerPath = useLocation().pathname.includes("owner")

  return (
    <div>
      { !isOwnerPath && <NavBar/>}
    </div>
  )
}

export default App