interface Window {
  $loadingBar?: import("naive-ui").LoadingBarProviderInst;
  $dialog?: import("naive-ui").DialogProviderInst;
  $message?: import("naive-ui").MessageProviderInst;
  $notification?: import("naive-ui").NotificationProviderInst;
}

interface ViewTransition {
  ready: Promise<void>;
}

interface Document {
  startViewTransition?: (
    callback: () => Promise<void> | void
  ) => ViewTransition;
}

/**  */
declare namespace Common {
  /**
   *
   */
  type StrategyAction = [boolean, () => void];

  /**  */
  type OptionWithKey<K> = { value: K; label: string };
}

/**  */
declare const PROJECT_BUILD_TIME: string;

declare module "*.vue";
