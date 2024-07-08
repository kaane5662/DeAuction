import { Link } from "react-router-dom";
import AuthInputField from "../components/AuthInputField";

export default function SignUp(){
    return(
        <main className="grid grid-cols-2 gap-24 font-epilogue bg-primary text-secondary h-screen">
            <div className="flex flex-col px-32 py-24">
                <div className="flex flex-col gap-2 text-center">
                    <h1 className="text-4xl font-bold">Create an Account</h1>
                    <h3 className="text-md text-secondary text-opacity-50">Sign up now to participate in auctions</h3>
                </div>
                <div className="flex flex-col gap-4 my-10">
                    <AuthInputField name={"Email"} label={"Email"} placeholder={"Enter your email..."}></AuthInputField>
                    <AuthInputField name={"Password"} label={"Password"} placeholder={"Enter your password..."}></AuthInputField>
                    <AuthInputField name={"ConfirmPassword"} label={"Confirm Password"} placeholder={"Confirm your password..."}></AuthInputField>
                </div>
                <button className="bg-complementary text-primary font-bold p-4 rounded-xl">Sign Up</button>
                <p className="text-sm mt-4">Already have an account? <Link to={"/login"} className="text-complementary hover:underline">Login</Link></p>
            </div>
            <img className="rounded-lg bg-complementary h-full w-full">
                
            </img>
        </main>
    )
}