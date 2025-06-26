import { useState, useEffect } from "react";


const useDeboundce = (value: any, delay : number) => {
    const [debounceValue, setDebounceValue] = useState(value)

    useEffect(() =>{
        const timeoutId = setTimeout(() => {
            setDebounceValue(value)

        }, delay)

        return () => {
            clearTimeout(timeoutId)
        }
        
    },[value, delay])

    return debounceValue

}

export default useDeboundce