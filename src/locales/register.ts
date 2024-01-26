import { StorageKey } from "@/utils/storage/type";
import { localStg } from "@/utils/storage";

export function registerLang() {
  localStg.set(StorageKey.lang, "vi");
}
