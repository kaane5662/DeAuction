export default function AuthInputField({name, label, type, placeholder, defaultValue}){
    return(
        <div className="flex flex-col gap-1">
            <label className="text-sm text-secondary text-opacity-50">{label}</label>
            <input className="text-md p-3 rounded-lg bg-primary border-secondary w-full border-2 border-opacity-20" name={name} type={type} placeholder={placeholder} defaultValue={defaultValue}></input>
        </div>
    )
}