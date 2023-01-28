import * as SecureStore from 'expo-secure-store';

export const secureStoreSave = async (key: string, value: string) => {
  await SecureStore.setItemAsync(key, value);
};

export const secureStoreGetValue = async (key: string) => {
  const value = await SecureStore.getItemAsync(key);
  if (value) {
    return value;
  } else {
    return null;
  }
};
