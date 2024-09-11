import {HTMLInputTypeAttribute} from "react";
import {RiCheckLine} from "@remixicon/react";
import {LoadingSpinner} from "@/src/components/progress";

export default function TextInput({value, setValue, type, className, placeholder, loading, onSave, mexLine = 1}: {
    value: string,
    placeholder?: string,
    setValue: (value: string) => void,
    type?: HTMLInputTypeAttribute,
    className?: string,
    onSave?: () => void,
    loading?: boolean,
    mexLine?: number
}) {
    const inputClassName = `w-full rounded-3xl ${className} px-3 focus:outline-0 focus-within:outline-0 focus-visible:outline-0 focus-visible:bg-blue-mint-lighter/50`

    return (
        <div className={"flex flex-row gap-1 border-2 rounded-3xl border-blue-mint-dark"}>
            {mexLine === 1 ? <input value={value}
                                    placeholder={placeholder}
                                    onChange={(e) => setValue(e.target.value)}
                                    className={inputClassName}
                                    onBlur={onSave}
                                    type={type || "text"}/>
                : <textarea value={value}
                            placeholder={placeholder}
                            onBlur={onSave}
                            onChange={(e) => setValue(e.target.value)}
                            className={`${inputClassName} py-3`}
                            rows={mexLine}/>
            }
            {onSave && <button disabled={!value || loading} onClick={onSave}
                               className={"p-2 bg-blue-mint-light disabled:bg-gray-300 m-1 text-white rounded-full"}>
                {loading ? <LoadingSpinner/> : <RiCheckLine color={"blue-mint-dark"}/>}
            </button>}
        </div>
    );
}
