import { IoPersonCircleOutline } from "react-icons/io5";

export default function UserBid({price,user,placed}){
    return(
        <div className="grid grid-cols-5 p-2 place-items-center gap-12 bg-secondary bg-opacity-[.03] text-secondary rounded-lg ">
            <IoPersonCircleOutline size={40} className="text-complementary col-span-1"></IoPersonCircleOutline>
            <div className="col-span-3 flex flex-col">
                <h3 className="font-bold text-md">{user}</h3>
                <h3 className="text-sm text-opacity-50 text-secondary">Placed on {placed}</h3>
            </div>

            <h1 className="font-bold tracking-wider text-md col-span-1">{price} ETH</h1>

        </div>
    )
}