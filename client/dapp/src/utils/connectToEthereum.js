const HARDHAT_NETWORK_URL = 'http://127.0.0.1:8545/';
const contractAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3';

import abi from "./RealEstateToken.json";
import { ethers } from 'ethers';

// Function to connect to Ethereum provider
export default async function connectToEthereum() {
    
    const provider = new ethers.JsonRpcProvider(HARDHAT_NETWORK_URL);
    // provider.getNetwork().then(network => console.log("Connected to network:", network.name));
    // console.log("Contract address:", contractAddress.address);
    const signer = await provider.getSigner(2);
    // console.log(signer)
    const contract = new ethers.Contract(contractAddress, abi.abi, signer);
    // console.log(contract)
    return contract
}


export async function createContractTransaction(){
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner()
    // console.log(signer)
    const contract = new ethers.Contract(contractAddress, abi.abi, signer);
    return contract
}
