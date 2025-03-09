import { useEffect, useState } from "react"

export const useFetch = <T>(fetchFunction: ()=> Promise <T>, autoFetch = true)=>{
    const [data,setData] = useState<T | null>(null);
    const [loading,setLoading] = useState(false);
    const [error,setError] = useState<Error | null>(null);

    const fetchData = async ()=>{
        try {
            setLoading(true);
            setError(null);

            const result = await fetchFunction()

            setData(result)
        } catch (err) {
            //@ts-ignore
            setError(err instanceof Error ? err : new Error("an error occurred"));
        } finally{
            setLoading(false)
        }
    }
    const reset = () =>{
        setData(null);
        setLoading(false);
        setError(null);
    }
    useEffect(()=>{
        if(autoFetch){
            fetchData();
        }
    },[]);
    return {data ,loading, reset,refetch:fetchData,error};
}