import { createI18n } from "vue-i18n";
import en from "./en.json";
import vi from "./vi.json";
import { localStg } from "@/utils";
import { StorageKey } from "@/utils/storage/type";
const i18n = createI18n({
  legacy: false,
  locale: localStg.get(StorageKey.lang) || "vi",
  messages: {
    en,
    vi,
  },
});

export default i18n;
