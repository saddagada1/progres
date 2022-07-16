import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useContext, useEffect, useState } from "react";

interface MeValues {
  name: string | null,
  setName: React.Dispatch<React.SetStateAction<string | null>>
  loading: boolean
}

const MeContext = createContext<MeValues | null>(null);

interface MeProviderProps {
  children: React.ReactNode;
}

const MeProvider: React.FC<MeProviderProps> = ({ children }) => {
  const [name, setName] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const getName = async () => {
    try {
      const data = await AsyncStorage.getItem('@me');
      if (data) {
        setName(data)
      }
    } catch (error) {
      console.log('Error Retrieving @me: ', error)
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getName();
  }, [])
  
  return <MeContext.Provider value={{name, setName, loading}}>{children}</MeContext.Provider>;
};

export const useMeContext = () => useContext(MeContext);

export default MeProvider;
