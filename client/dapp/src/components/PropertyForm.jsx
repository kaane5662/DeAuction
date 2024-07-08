import { FaCircleNotch, FaEthereum } from "react-icons/fa";
import connectToEthereum, {createContractTransaction} from "../utils/connectToEthereum";
import {ethers} from "ethers"
import { useContext } from "react";
import { GlobalStateContext } from "../providers/GlobalStateProvider";
import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";


const customToastStyles = {
    background: 'white',
    color: 'black',
    fontSize: '16px',
    borderRadius: '12px',
};

  
export default function PropertyForm({PropertyDetails}){
    const {state,setState} = useContext(GlobalStateContext)
    const navigate = useNavigate()
    const [loading, setIsLoading] = useState(false)
    const createRealEstateToken = async (e)=>{
        e.preventDefault()

        try{
            let details =  {
                streetAddress: e.target.streetAddress.value,
                zipCode: e.target.zip.value,
                city: e.target.city.value,
                propertyType: e.target.propertyType.value,
                areaSquareMeters: e.target.areaSquareMeters.value,
                bedrooms: e.target.bedrooms.value,
                bathrooms: e.target.bathrooms.value,
                additionalDetails: e.target.description.value,
                price: ethers.parseEther(e.target.price.value)
            }
            console.log(details)
            // console.log(e.target.streetAddress.value)
            
            setIsLoading(true)
            let transactionContract = await connectToEthereum();
            await transactionContract.mint(details,"bijrtbrotojirtooi");

            setTimeout(()=>{
                toast.success("Transaction confirmed")
                setIsLoading(false)
                navigate("/")

            },1000)
            
            // console.log(tokenData)
        }catch(error){
            setIsLoading(false)
            toast.error("An unexpected error has occured when minting token", {style:customToastStyles})
            console.log(error)
            console.log(error.message)
        }
        
    }

    return(
        <form onSubmit={createRealEstateToken} className="grid grid-cols-2 gap-x-4 gap-y-4 py-8 w-[80%]">
            <div className="grid grid-cols-2 gap-x-4 gap-y-4">
                <div className="flex flex-col gap-1 col-span-2">
                    <label className="text-sm text-secondary text-opacity-50">Street Address</label>
                    <input name="streetAddress" className="rounded-md border-2 border-opacity-10 bg-primary border-secondary p-2"></input>
                </div>
                <div className="flex flex-col gap-1 ">
                    <label className="text-sm text-secondary text-opacity-50">ZIP Code</label>
                    <input name="zip" className="rounded-md border-2 border-opacity-10 bg-primary border-secondary p-2"></input>
                </div>
                <div className="flex flex-col gap-1">
                    <label className="text-sm text-secondary text-opacity-50">City</label>
                    <input name="city" className="rounded-md border-2 border-opacity-10 bg-primary border-secondary p-2"></input>
                </div>
                <div className="flex flex-col gap-1">
                    <label className="text-sm text-secondary text-opacity-50">Property Type</label>
                    <select name="propertyType" defaultValue={"Apartment"} className=" text-secondary text-opacity-50 rounded-md border-2 border-opacity-10 border-secondary bg-primary p-2">
                        <option className="p-4" value={"Home"}>Home</option>
                        <option className="p-4" value={"Studio"}>Studio</option>
                        <option className="p-4" value={"Apartment"}>Apartment</option>
                        <option className="p-4" value={"Apartment"}>Retail</option>
                    </select>
                </div>
                
                <div className="flex flex-col gap-1">
                    <label className="text-sm text-secondary text-opacity-50">Bathrooms</label>
                    <input type="number" name="bathrooms" className="rounded-md border-2 border-opacity-10 bg-primary border-secondary p-2"></input>
                </div>
                
                <div className="flex flex-col gap-1">
                    <label className="text-sm text-secondary text-opacity-50">Bedrooms</label>
                    <input type="number" name="bedrooms" className="rounded-md border-2 border-opacity-10 bg-primary border-secondary p-2"></input>
                </div>
                
                <div className="flex flex-col gap-1">
                    <label className="text-sm text-secondary text-opacity-50">Square Foot</label>
                    <input type="number" name="areaSquareMeters" className="rounded-md border-2 border-opacity-10 bg-primary border-secondary p-2"></input>
                </div>
                <div className="flex flex-col gap-1 col-span-2">
                    <label className="text-sm text-secondary text-opacity-50">Price (ETH)</label>
                    
                    <input name="price" step={.000000000000000000000000000001} type="number" className="rounded-md border-2 border-opacity-10 bg-primary border-secondary p-2"></input>
                        
                    
                </div>
            
                <button disabled={loading} className="w-fit bg-complementary text-primary p-3 px-8 hover:bg-opacity-50 duration-100 rounded-lg font-bold">{loading ? (<h1 className="animate-spin"> <FaCircleNotch size={20}></FaCircleNotch></h1>): "Mint"}</button>
                

            </div>
            <div className="">
                <div className="flex flex-col gap-1 col-span-2">
                    <label className="text-sm text-secondary text-opacity-50">Description</label>
                    <textarea name="description" className="rounded-md h-[125px] bg-primary border-2 border-opacity-10 border-secondary p-2"></textarea>
                </div>
            </div>
            
                
                
        </form>
    )
}