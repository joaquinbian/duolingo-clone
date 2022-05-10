import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const useAsyncStorage = (key: string) => {
  const getDataFromStorage = async () => {
    return await AsyncStorage.getItem(key);
  };

  const setValue = async (value: any) => {
    try {
      await AsyncStorage.setItem(key, value.toString());
    } catch (error) {
      console.log({ error });
    }
  };

  return {
    setValue,
    getDataFromStorage,
  };
};
