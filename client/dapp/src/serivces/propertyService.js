import axios from "axios"
const SERVER = import.meta.env.VITE_SERVER

const getProperty(id)=>{
    axios.get(`${}`)
}