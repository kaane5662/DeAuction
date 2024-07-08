import { FaCircleNotch } from "react-icons/fa";

export default function LoadingPage(){
    return(
        <div className="h-screen bg-primary text-secondary flex my-44 justify-center">
            <h1 className="animate-spin h-fit w-fit"> <FaCircleNotch size={30}></FaCircleNotch></h1>
        </div>
    )
}