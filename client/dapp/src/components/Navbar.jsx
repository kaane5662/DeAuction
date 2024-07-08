import { Link } from "react-router-dom";
import { ethers } from "ethers";
import { useContext, useEffect, useState } from "react";
import { FaCube } from "react-icons/fa";
import { GlobalStateContext } from "../providers/GlobalStateProvider";
export default function Navbar(){

    const { state, setState } = useContext(GlobalStateContext);

    const connectWallet = async () => {
        try {
            const { ethereum } = window;

            if (!ethereum) {
                alert('Please install MetaMask!');
                return;
            }

            const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
            console.log(accounts[0])
            setState(prevState=>({...prevState, walletAddress: accounts[0]}))
           

        } catch (error) {
            alert('Error connecting wallet:', error);
        }
    };

    const getWallet = async () => {
        try {
            const { ethereum } = window;

            const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
            setState(prevState=>({...prevState, walletAddress: accounts[0]}))
        } catch (error) {
            alert('Error connecting wallet:', error);
        }
    };


    useEffect(()=>{
        getWallet()
    })

    return(
        <nav className="fixed w-full bg-primary text-secondary font-epilogue border-secondary border-opacity-10 border-b-2">
            <div className="flex justify-between   px-32 items-center">
                <div className="flex gap-4 items-center">
                    <Link to={"/"} className=" p-4 hover:border-b-complementary hover:border-b-2 px-8 text-sm">Buy</Link>
                    <Link to={"/create"} className=" p-4 hover:border-b-complementary hover:border-b-2 px-8 text-sm ">Sell</Link>
                </div>
                <h1 className="font-bold text-3xl">PropertyChain</h1>
                {state.walletAddress ? (
                    <div className="flex gap-4 items-center">
                        <Link to={"/mylistings"} className=" p-4 hover:border-b-complementary hover:border-b-2 px-8 text-sm ">My Listings</Link>
                        <h3 className="text-secondary text-opacity-50 flex gap-2 items-center text-sm"> <FaCube className="text-complementary"></FaCube>{state.walletAddress.substring(0,12)+"..."}</h3>
                    </div>
                ):(
                    <button onClick={connectWallet} className="rounded-full p-2 px-4 bg-complementary text-primary font-bold hover:scale-105 duration-100">Connect Wallet</button>
                )}
            </div>    
        </nav>
    )
}