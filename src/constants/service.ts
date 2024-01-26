/** Hết thời gian yêu cầu */
export const REQUEST_TIMEOUT = 60 * 1000;

/** Hiển thị thời gian báo lỗi */
export const ERROR_MSG_DURATION = 3 * 1000;

/** Mã lỗi yêu cầu mặc định */
export const DEFAULT_REQUEST_ERROR_CODE = "DEFAULT";

/** Văn bản lỗi yêu cầu mặc định */
export const DEFAULT_REQUEST_ERROR_MSG = "error";

/** Mã lỗi hết thời gian yêu cầu (giá trị cố định: ECONNABORTED) */
export const REQUEST_TIMEOUT_CODE = "ECONNABORTED";

/** Yêu cầu văn bản lỗi hết thời gian chờ */
export const REQUEST_TIMEOUT_MSG = "TIMEOUT";

export const NETWORK_ERROR_CODE = "NETWORK_ERROR";

/** Văn bản lỗi không có mạng */
export const NETWORK_ERROR_MSG = "Mạng không khả dụng";

/** Lỗi ở các trạng thái khác nhau của yêu cầu không thành công */
export const ERROR_STATUS = {
  400: "400: Đã xảy ra lỗi cú pháp trong yêu cầu~",
  401: "401: Người dùng không được ủy quyền~",
  403: "403: Máy chủ từ chối truy cập~",
  404: "404: Tài nguyên được yêu cầu không tồn tại~",
  405: "405: Phương thức yêu cầu không được phép~",
  408: "408: Yêu cầu mạng đã hết thời gian chờ~",
  500: "500: Lỗi nội bộ của máy chủ~",
  501: "501: Máy chủ không triển khai chức năng được yêu cầu~",
  502: "502: Sai cổng~",
  503: "503: Dịch vụ không khả dụng~",
  504: "504: Hết thời gian chờ cổng~",
  505: "505: Phiên bản http không hỗ trợ yêu cầu này~",
  [DEFAULT_REQUEST_ERROR_CODE]: DEFAULT_REQUEST_ERROR_MSG,
};

/** Code không hiện thông báo lỗi */
export const NO_ERROR_MSG_CODE: (string | number)[] = [];

/** Nếu token hết hạn, bạn cần làm mới mã token (66666 ở đây chỉ là ví dụ, bạn cần điền mã back-end cho biết token đã hết hạn) */
export const REFRESH_TOKEN_CODE: (string | number)[] = [66666];
