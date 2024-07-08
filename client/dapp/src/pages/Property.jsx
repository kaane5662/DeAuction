import { useParams } from "react-router-dom"
import { FaDollarSign, FaCube, FaEthereum, FaCircleNotch } from "react-icons/fa"
import { IoPersonCircleOutline } from "react-icons/io5"
import { useEffect, useState } from "react"
import connectToEthereum from "../utils/connectToEthereum"
import { ethers } from "ethers"
import LoadingPage from "../components/LoadingPage"
import { toast } from "react-toastify"
import axios from "axios"
import BidPopup from "../components/BidPopup"
import UserBid from "../components/UserBid"

export default function Property(){
    const {id} = useParams()
    const [Property, setProperty] = useState()
    const [Bids, setBids] = useState([])
    const [bidPopup, setBidPopup] = useState(false)

    // const getProperty = async ()=>{
    //     try{
    //         const contract = await connectToEthereum()
    //         const property = await contract.getToken(id)
    //         // setTimeout(()=>{console.log(hello)},10000)
    //         let propertyDict = {
    //             ...property[0],
    //             owner: property[1],
    //             uri: property[2]
    //         }

    //         console.log(propertyDict)
            
    //         setProperty(propertyDict)
  
    //     }catch(error){
    //         console.log(error.status)
    //         console.log(error)
    //     }
    // }
    const getPropertyById = async ()=>{
        console.log(import.meta.env.VITE_SERVER)
        axios.get(`${import.meta.env.VITE_SERVER}/api/property/${id}`).then((response)=>{
            console.log(response.data)
            setProperty(response.data)
        }).catch(error=>{
            console.log(error)
            console.log(error.message)
        })
    }
    const getBidsById = async ()=>{
        console.log(import.meta.env.VITE_SERVER)
        axios.get(`${import.meta.env.VITE_SERVER}/api/bid/${id}`).then((response)=>{
            console.log(response.data)
            setBids(response.data)
        }).catch(error=>{
            console.log(error)
            console.log(error.message)
        })
    }

    const purchaseProperty =async  (e)=>{
        try{
            const contract = await connectToEthereum()
            console.log(Property[4])
            await contract.purchaseToken(id,{value: Property[4] })    
            toast.success("Property bought successfully")
        }catch(error){
            console.log(error.message)
        }
    }

    useEffect(()=>{
        getPropertyById()
        getBidsById()
    },[])



    return(
        <main className="p-32 py-24 min-h-screen bg-primary text-secondary justify-center flex font-epilogue">
            {bidPopup && <BidPopup setActive={setBidPopup} id={id}></BidPopup>}
            
            {Property ? (
                <div className="w-[70%] flex flex-col gap-4">
                    <img src="https://images.squarespace-cdn.com/content/v1/65a8583b3f2bb32732bff587/63ff3986-3c95-4422-bdaa-6a373b71140d/Custom-Luxury-Home-Dallas.jpg" className="h-[350px] object-cover object-top rounded-md"></img>
                    <div className="flex flex-col gap-0 hover:underline mt-2">
                        <h1 className="font-bold text-3xl">{Property?.title}</h1>
                        <h3 className="font-bold text-lg"> {Property?.address}</h3>
                        <h3 className="text-md text-opacity-50 text-secondary flex gap-2"> {Property?.city}, {Property?.state}, {Property?.zip}</h3>

                    </div>
                    <p className="flex items-center gap-2"><IoPersonCircleOutline size={30} className="text-complementary"/> kaane0169</p>
                    
                    <div className="flex gap-8">
                        <div className="flex flex-col">
                            <p className="text-secondary text-opacity-50">Current Bid</p>
                            <h3 className="font-bold text-xl tracking-wider flex gap-2"> {Property?.price} <h1 className="text-complementary">ETH</h1></h3>
                        </div>
                        <div className="flex flex-col">
                            <p className="text-secondary text-opacity-50">Bid Ends</p>
                            <h3 className="font-bold text-xl tracking-wider flex gap-2"> {Property?.price} <h1 className="text-complementary">ETH</h1></h3>
                        </div>
                    </div>
                    <h3 className=" text-secondary text-opacity-50">Details</h3>
                    <p className="text-md">{Property?.description}</p>
                        

                    
                    <button onClick={()=>setBidPopup(true)} className="p-3 rounded-lg px-8 hover:opacity-50 duration-200 bg-complementary font-bold w-fit text-primary">Bid</button>

                    <h3 className=" text-secondary text-opacity-50">Bids</h3>

                    <div className="flex flex-col gap-2">
                        {Bids.map((bid,index)=>{
                            return(
                                <UserBid placed={bid?.createdAt} price={bid?.price} user={bid?.email}></UserBid>
                            )
                        })}

                    </div>

                    
                    
                    
                </div>  

            ):(<LoadingPage/>)}


            
        </main>
    )
}