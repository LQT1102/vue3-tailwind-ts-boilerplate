import { useI18n } from "vue-i18n";
import vi from "@/locales/vi.json";

/**
 * Hook dịch i18n hỗ trợ gợi ý key
 * @returns
 * @author LQTUAN (26/01/2024)
 */
export default function useTranslation() {
  const { t: trans } = useI18n();
  const t = (key: I18nType.GetI18nKey<typeof vi>, param?: any) => {
    if (param) return trans(key, param);
    return trans(key);
  };

  return t;
}
