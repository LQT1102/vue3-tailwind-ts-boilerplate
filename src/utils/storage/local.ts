import { StorageInterface } from "@/typings/storage";
import { encrypt, decrypt } from "../crypto";
import { StorageKey } from "./type";
interface StorageData<T> {
  value: T;
  expire: number | null;
}

function createLocalStorage<
  T extends StorageInterface.Local = StorageInterface.Local
>() {
  const DEFAULT_CACHE_TIME = 60 * 60 * 24 * 7;

  function set<K extends keyof T>(
    key: StorageKey,
    value: T[K],
    expire: number | null = DEFAULT_CACHE_TIME
  ) {
    const storageData: StorageData<T[K]> = {
      value,
      expire: expire !== null ? new Date().getTime() + expire * 1000 : null,
    };
    const json = encrypt(storageData);
    window.localStorage.setItem(key, json);
  }

  function get<K extends keyof T>(key: StorageKey) {
    const json = window.localStorage.getItem(key as string);
    if (json) {
      let storageData: StorageData<T[K]> | null = null;
      try {
        storageData = decrypt(json);
      } catch {}
      if (storageData) {
        const { value, expire } = storageData;
        if (expire === null || expire >= Date.now()) {
          return value as T[K];
        }
      }
      remove(key);
      return null;
    }
    return null;
  }

  function remove(key: StorageKey) {
    window.localStorage.removeItem(key as string);
  }
  function clear() {
    window.localStorage.clear();
  }

  return {
    set,
    get,
    remove,
    clear,
  };
}

export const localStg = createLocalStorage();
