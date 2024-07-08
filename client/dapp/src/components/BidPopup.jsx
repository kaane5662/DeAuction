import axios from "axios"
import { useState } from "react"
import { FaCircleNotch } from "react-icons/fa"
import { toast } from "react-toastify"

export default function BidPopup({id,setActive}){
    const [loading,setLoading] = useState(false)
    const generateBid = async (e)=>{
        e.preventDefault()
        setLoading(true)
        axios.post(`${import.meta.env.VITE_SERVER}/api/bid/${id}`,{Price:e.target.Price.value},{withCredentials:true}).then((response)=>{
            setLoading(false)
            setActive(false)
            window.location.reload()
        }).catch(error=>{
            setLoading(false)
            toast.error(error?.response?.data,{progress:false, draggable:true, position: "top-right"})
            console.log(error)
        })
    }

    return(
        <div className="fixed justify-center items-center flex font-epilogue ">

            <form onSubmit={generateBid} className="flex flex-col gap-8 p-12 bg-secondary text-primary shadow-md rounded-md relative">
                <p onClick={()=>setActive(false)} className="absolute top-2 right-2 text-2xl font-bold hover:cursor-pointer">X</p>
                <h1 className="text-4xl font-bold">Bid an Amount</h1>
                <div className="flex flex-col">
                    <label className="text-sm text-opacity-50 text-primary">Bid (ETH)</label>
                    <input name="Price" step={.0000000001} type="number" className="tracking-wider p-2 rounded-lg bg-secondary border-primary border-opacity-20  border-2"></input>
                </div>
                <button className="p-3 rounded-lg w-full bg-complementary font-bold hover:opacity-50 duration-100"> {loading? <FaCircleNotch className="w-fit h-fit animate-spin place-self-center self-center" size={20}/>:"Place Bid"} </button>
            </form>
        </div>

    )
}