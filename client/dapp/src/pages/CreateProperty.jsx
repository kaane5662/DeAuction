import PropertyForm from "../components/PropertyForm";

export default function CreateProperty(){

    return(
        <main className="p-32 min-h-screen bg-primary text-secondary font-epilogue">
            <h1 className="text-2xl font-bold">Create Real Estate Token</h1>
            <h1 className="text-md text-opacity-50 text-secondary">Enter the details below to tokenize your property</h1>
            <PropertyForm></PropertyForm>
        </main>
    )
}