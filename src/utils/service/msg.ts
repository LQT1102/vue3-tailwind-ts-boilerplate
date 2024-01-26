import { ERROR_MSG_DURATION, NO_ERROR_MSG_CODE } from "@/constants/service";

const errorMsgStack = new Map<string | number, string>([]);

function addErrorMsg(error: Service.RequestError) {
  errorMsgStack.set(error.code, error.msg);
}
function removeErrorMsg(error: Service.RequestError) {
  errorMsgStack.delete(error.code);
}
function hasErrorMsg(error: Service.RequestError) {
  return errorMsgStack.has(error.code);
}

/**
 *
 * @param error
 */
export function showErrorMsg(error: Service.RequestError) {
  if (
    !error.msg ||
    NO_ERROR_MSG_CODE.includes(error.code) ||
    hasErrorMsg(error)
  )
    return;

  addErrorMsg(error);
  window.console.warn(error.code, error.msg);
  window.$message?.error(error.msg, { duration: ERROR_MSG_DURATION });
  setTimeout(() => {
    removeErrorMsg(error);
  }, ERROR_MSG_DURATION);
}
