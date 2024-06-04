import { useEffect, useState } from "react";

export function useDebounce(value:string,delay:number){
    const [debounedValue,setDebouncedValue] = useState("");

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value)
        },delay);

        return () => {
            clearTimeout(handler);
        }
    },[value,delay])

    return debounedValue
}