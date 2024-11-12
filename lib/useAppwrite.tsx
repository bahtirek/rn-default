import { useEffect, useState } from "react";
import { Alert } from "react-native";
import { VideoCardType } from "src/types";

const useAppwrite = <T extends VideoCardType[]>(fn: any) => {
    const [data, setData] = useState<any>([]);
    const [isLoading, setisLoading] = useState(true);
  
    const fetchData = async() => {
      try {
        setisLoading(true);
        const response = await fn();
        setData(response)
      } catch (error: any) {
        Alert.alert('Error', error.message)
      } finally {
        setisLoading(false)
      }
    }

    useEffect(() => {
      fetchData();
    }, [])

    const refetch = fetchData;
  
    return {data, isLoading, refetch};
}

export default useAppwrite;