import { Link } from "react-router-dom";
import AuthInputField from "../components/AuthInputField";

export default function Login(){
    return(
        <main className="bg-primary text-secondary justify-center flex font-epilogue h-screen">
            <div className="flex flex-col px-32 py-32 w-[45%]">
                <div className="flex flex-col gap-2 text-center">
                    <h1 className="text-4xl font-bold">Welcome back</h1>
                    <h3 className="text-md text-secondary text-opacity-50">Sign in to continue listing your properties</h3>
                </div>
                <div className="flex flex-col gap-4 my-10">
                    <AuthInputField name={"Email"} label={"Email"} placeholder={"Enter your email..."}></AuthInputField>
                    <AuthInputField name={"Password"} label={"Password"} placeholder={"Enter your password..."}></AuthInputField>
                </div>
                <button className="bg-complementary text-primary font-bold p-4 rounded-xl">Login</button>
                <p className="text-sm mt-4">Don't have an account? <Link to={"/signup"} className="text-complementary hover:underline">Sign up</Link></p>
            </div>
        </main>
    )
}