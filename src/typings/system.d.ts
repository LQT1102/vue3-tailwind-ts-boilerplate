declare namespace Service {
  /**
   *
   * - axios: axioslỗi mạng, hết thời gian yêu cầu, lỗi che đậy mặc định
   * - http: thành công, mã trạng thái http phản hồi không bị lỗi 200
   * - backend: thành công, mã trạng thái http phản hồi là 200 và lỗi nghiệp vụ do backend xác định
   */
  type RequestErrorType = "axios" | "http" | "backend";

  interface RequestError {
    /** Loại lỗi yêu cầu dịch vụ */
    type: RequestErrorType;
    /** mã lỗi */
    code: string | number;
    /** thông báo lỗi */
    msg: string;
  }

  interface BackendResultConfig {
    /** Trường thuộc tính đại diện cho mã trạng thái yêu cầu phụ trợ */
    codeKey: string;

    dataKey: string;

    msgKey: string;

    successCode: number | string;
  }

  interface SuccessResult<T = any> {
    error: null;

    data: T;
  }

  /** Kết quả lỗi yêu cầu tùy chỉnh */
  interface FailedResult {
    /** Yêu cầu lỗi */
    error: RequestError;
    /** Yêu cầu dữ liệu */
    data: null;
  }

  /**  */
  type RequestResult<T = any> = SuccessResult<T> | FailedResult;

  /**  */
  type MultiRequestResult<T extends any[]> = T extends [
    infer First,
    ...infer Rest
  ]
    ? [First] extends [any]
      ? Rest extends any[]
        ? [Service.RequestResult<First>, ...MultiRequestResult<Rest>]
        : [Service.RequestResult<First>]
      : Rest extends any[]
      ? MultiRequestResult<Rest>
      : []
    : [];

  /**  */
  type ServiceAdapter<T = any, A extends any[] = any> = (...args: A) => T;

  /**  */
  interface MockServiceResult<T = any> {
    /**  */
    code: string | number;
    /**  */
    data: T;
    /**  */
    message: string;
  }

  /**  */
  interface MockOption {
    url: Record<string, any>;
    body: Record<string, any>;
    query: Record<string, any>;
    headers: Record<string, any>;
  }
}

/**  */
declare namespace Theme {
  /**  */
  interface Setting {
    darkMode: boolean;
    followSystemTheme: boolean;
    isCustomizeDarkModeTransition: boolean;
    layout: Layout;
    scrollMode: UnionKey.ThemeScrollMode;
    scrollModeList: Common.OptionWithKey<UnionKey.ThemeScrollMode>[];
    themeColor: string;
    themeColorList: string[];
    otherColor: OtherColor;
  }
  interface Layout {
    minWidth: number;
    mode: UnionKey.ThemeLayoutMode;
    modeList: Common.OptionWithKey<UnionKey.ThemeLayoutMode>[];
  }

  interface OtherColor {
    info: string;
    success: string;
    warning: string;
    error: string;
  }

  interface Header {
    inverted: boolean;
    height: number;
    crumb: Crumb;
  }

  interface Crumb {
    visible: boolean;
    showIcon: boolean;
  }

  export interface Tab {
    visible: boolean;
    height: number;
    mode: UnionKey.ThemeTabMode;
    modeList: Common.OptionWithKey<UnionKey.ThemeTabMode>[];
    isCache: boolean;
  }

  interface Sider {
    inverted: boolean;
    width: number;
    collapsedWidth: number;
    mixWidth: number;
    mixCollapsedWidth: number;
    mixChildMenuWidth: number;
  }

  interface Menu {
    horizontalPosition: UnionKey.ThemeHorizontalMenuPosition;
    horizontalPositionList: Common.OptionWithKey<UnionKey.ThemeHorizontalMenuPosition>[];
  }

  interface Footer {
    visible: boolean;
    fixed: boolean;
    right: boolean;
    height: number;
    inverted: boolean;
  }

  interface Page {
    animate: boolean;
    animateMode: UnionKey.ThemeAnimateMode;
    animateModeList: Common.OptionWithKey<UnionKey.ThemeAnimateMode>[];
  }
}

declare namespace App {
  interface GlobalHeaderProps {
    showLogo: boolean;
    showHeaderMenu: boolean;
    showMenuCollapse: boolean;
  }

  interface GlobalHeaderProps {
    showLogo: boolean;
    showHeaderMenu: boolean;
    showMenuCollapse: boolean;
  }

  interface MessageList {
    id: number;

    avatar?: string;

    icon?: string;
    svgIcon?: string;

    title: string;

    date?: string;

    isRead?: boolean;

    description?: string;

    tagTitle?: string;

    tagProps?: import("naive-ui").TagProps;
  }
}

declare namespace I18nType {
  type LangType = "en" | "vi";
  type Schema = {
    message: string;
  };
  type GetI18nKey<
    T extends Record<string, unknown>,
    K extends keyof T = keyof T
  > = K extends string
    ? T[K] extends Record<string, unknown>
      ? `${K}.${GetI18nKey<T[K]>}`
      : K
    : never;

  type I18nKey = GetI18nKey<Schema>;
}
