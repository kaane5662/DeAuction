import PropertyForm from "../components/PropertyForm";

export default function UpdateProperty(){

    return(
        <main className="p-32 min-h-screen bg-primary text-secondary font-epilogue">
            <h1 className="text-2xl font-bold">Edit Real Estate Token</h1>
            <h1 className="text-md text-opacity-50 text-secondary">Enter the details bellow to edit your token</h1>
            <PropertyForm></PropertyForm>
        </main>
    )
}