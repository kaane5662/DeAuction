import { useEffect, useState } from "react";
import Property from "../components/Property";
import connectToEthereum, { createContractTransaction } from "../utils/connectToEthereum";
import axios from "axios";
import { toast } from "react-toastify";

export default function Home(){
    const [Properties, setProperties] = useState([])

    // const getProperties = async ()=>{
    //     try{
    //         const contract = await connectToEthereum()
    //         const res = await contract.getToken(0);
    //         // console.log(res)
    //         // // console.log('Token Details:', details);
    //         // // console.log('Owner:', owner);
    //         // // console.log('URI:', uri);

    //         const [tokens, owners, uris] = await contract.getTokens()
    //         console.log(tokens[0][0])
    //         const PropertiesTemp = []
    //         for(let i = 0; i < tokens.length; i++){
    //             PropertiesTemp.push({...tokens[i], owner: owners[i], uri: uris[i]})
    //         }

    //         console.log(PropertiesTemp)
    //         setProperties(PropertiesTemp)
    //     }catch(error){
    //         console.log(error.status)
    //         console.log(error)
    //     }
    // }
    const getProperties = async ()=>{
        
        console.log(import.meta.env.VITE_SERVER)
        axios.get(`${import.meta.env.VITE_SERVER}/api/property`).then((response)=>{
            
            setProperties(response.data)
        }).catch(error=>{
            
            toast.error(error.message,{progress:false, draggable:true, position: "top-right"})
            console.log(error.message)
        })
    }

    useEffect(()=>{
        getProperties()
    },[])



    return(
        <main className="min-h-screen bg-primary text-secondary p-32 font-epilogue flex flex-col gap-4">
            <h1 className="font-bold text-2xl">Properties</h1>
            <div className="grid grid-cols-3 gap-8">
                {Properties.map((property,index)=>{
                    return(

                        <Property key={index} id={property?.id} title={property?.title} address={property?.address} price={property?.price} seller={property?.owner} zip={property?.zip} city={property?.city} state={property?.state}></Property>
                    )
                })}
                
            </div>
        </main>
    )
}