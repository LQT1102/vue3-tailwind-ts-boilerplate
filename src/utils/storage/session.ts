import { StorageInterface } from "@/typings/storage";
import { decrypt, encrypt } from "@/utils/crypto";
import { SessionKey } from "./type";

function createSessionStorage<
  T extends StorageInterface.Session = StorageInterface.Session
>() {
  function set<K extends keyof T>(key: SessionKey, value: T[K]) {
    const json = encrypt(value);
    sessionStorage.setItem(key as unknown as string, json);
  }
  function get<K extends keyof T>(key: SessionKey) {
    const json = sessionStorage.getItem(key as unknown as string);
    let data: T[K] | null = null;
    if (json) {
      try {
        data = decrypt(json);
      } catch {
        // 防止解析失败
      }
    }
    return data;
  }
  function remove(key: SessionKey) {
    window.sessionStorage.removeItem(key as unknown as string);
  }
  function clear() {
    window.sessionStorage.clear();
  }

  return {
    set,
    get,
    remove,
    clear,
  };
}

export const sessionStg = createSessionStorage();
