import { useState, useContext } from "react";
import { FaCube } from "react-icons/fa";
import { GlobalStateContext } from "../providers/GlobalStateProvider";
import connectToEthereum from "../utils/connectToEthereum";

export default function MyProperties(){
    const { state, setState } = useContext(GlobalStateContext);
   

    return(
        <main className="p-32 min-h-screen bg-primary text-secondary font-epilogue">
            <h1 className="font-bold text-2xl">My Listings</h1>
            <h3 className="text-secondary text-opacity-50 flex gap-2 items-center text-sm"> <FaCube className="text-complementary"></FaCube> {state?.walletAddress}</h3>
            <div className="">
                
            </div>
            
        </main>
    )
}