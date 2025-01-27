import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeData = async (value: any, key: string): Promise<any> => {
    try {
        if (!key) throw new Error("Key is required and cannot be empty.");

        const response = await getData(key);
        let data;

        if (!Array.isArray(response)) {
            data = [value];
        } else {
            data = [value,...response];
        }

        const jsonValue = JSON.stringify(data);
        await AsyncStorage.setItem(key, jsonValue);
        return data;
    } catch (e) {
        console.error("Error in storeData:", e);
    }
};

export const getData = async (key: string): Promise<any | null> => {
    try {
        if (!key) throw new Error("Key is required and cannot be empty.");

        const jsonValue = await AsyncStorage.getItem(key);
        return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
        console.error("Error in getData:", e);
    }
};

export const removeValue = async (key:string) => {
    try {
      await AsyncStorage.removeItem(key)
    } catch(e) {
      console.log(e)
    }
    console.log('Done.')
  }