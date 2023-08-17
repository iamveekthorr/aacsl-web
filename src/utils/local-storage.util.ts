import STORAGE_KEYS from './storage-keys.util';

const checkIfStorageExist: boolean = typeof window !== 'undefined';

export const saveItemToLocalStorage = (
  key: STORAGE_KEYS,
  value: string
): void => {
  if (checkIfStorageExist) return window.localStorage.setItem(key, value);
};

export const getItemFromStorage = (key: STORAGE_KEYS): string | null => {
  if (checkIfStorageExist) return window.localStorage.getItem(key);
  return null;
};

export const clearItems = () => {
  localStorage.clear();
};
