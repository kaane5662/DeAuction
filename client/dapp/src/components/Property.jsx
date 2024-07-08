import { Link } from "react-router-dom";
import { FaCube, FaDollarSign, FaEthereum } from "react-icons/fa";
import {ethers} from "ethers"
import { useEffect } from "react";

export default function Property({image, price, address,city, zip,state,title,id}){

    const getRealEstateToken = ()=>{
        try{

        }catch(error){

        }
    }

    useEffect(()=>{
        getRealEstateToken()
    },[])

    return(
        <Link to={`/property/${id}`} className="flex flex-col gap-4 rounded-xl">
            <img src="https://images.squarespace-cdn.com/content/v1/65a8583b3f2bb32732bff587/63ff3986-3c95-4422-bdaa-6a373b71140d/Custom-Luxury-Home-Dallas.jpg" className="h-[250px] object-cover object-top rounded-t-md"></img>
            {/* <h3 className="p-1 px-2 bg-complementary text-primary rounded-full text-sm w-fit">{propertyType}</h3> */}
            <div className="p-4 flex flex-col gap-4">
                <div className="flex flex-col gap-0">
                    <h1 className="font-bold text-lg">{title}</h1>
                    <h3 className="font-bold text-md"> {address}</h3>
                    <h3 className="text-sm text-opacity-50 text-secondary flex gap-2"> {city}, {state}, {zip}</h3>
                </div>
                <div className="flex flex-col">
                    <p className="text-secondary text-opacity-50">Current Bid</p>
                    <h3 className="font-bold text-xl tracking-wider flex gap-2"> {price} <h1 className="text-complementary">ETH</h1></h3>
                </div>

            </div>

        </Link>
    )
}