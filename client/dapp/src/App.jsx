import {BrowserRouter, Routes, Route} from "react-router-dom"
import { useContext } from "react"
// import './App.css'
import Home from "./pages/Home"
import Navbar from "./components/Navbar"
import Property from "./pages/Property"
import CreateProperty from "./pages/CreateProperty"
import GlobalStateProvider from "./providers/GlobalStateProvider"
import MyProperties from "./pages/MyProperties"
import {ToastContainer} from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import SignUp from "./pages/SignUp"
import Login from "./pages/Login"



function App() {

  return (
    

    <BrowserRouter>
      <Navbar></Navbar>
      <ToastContainer></ToastContainer>
      <Routes>
        <Route path="/" Component={Home}></Route>
        <Route path="/property/:id" Component={Property}></Route>
        <Route path="/create" Component={CreateProperty}></Route>
        <Route path="/mylistings" Component={MyProperties}></Route>
        <Route path="/signup" Component={SignUp}></Route>
        <Route path="/login" Component={Login}></Route>
      </Routes>
    </BrowserRouter>

  )
}

export default App
