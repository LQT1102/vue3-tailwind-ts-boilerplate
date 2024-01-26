import { APP_PREFIX } from "@/constants";
declare namespace StorageInterface {
  interface Session {
    themeColor: string;

    themeSettings: Theme.Setting;
  }

  interface Local {
    token: string;
    /**   */
    refreshToken: string;
    /**   */
    userInfo: Auth.UserInfo;
    /**   */
    multiTabRoutes: App.GlobalTabRoute[];
    /**   */
    lang: I18nType.LangType;
  }
}
