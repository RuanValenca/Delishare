import { errorToast, successToast } from "../../components/Toast";

export function toastMessage(message: string | string[], success?: boolean) {
  if (message && message.length <= 0) return;

  if (typeof message === "string")
    return message && (success ? successToast(message) : errorToast(message));
  else
    return message.forEach((text) => {
      if (message) {
        if (success) {
          successToast(text);
        } else {
          errorToast(text);
        }
      }
    });
}

export function defaultReturn(request: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
  message: string[];
  result: boolean;
}) {
  if (request) {
    if (request.result) {
      toastMessage(request.message, request.result);
      return request;
    } else {
      toastMessage(request.message);
      return request;
    }
  } else {
    return {
      result: false,
      message: [],
      data: [],
    };
  }
}

export function defaultReturnNotToast(request: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
  message: string[];
  result: boolean;
}) {
  return request;
}
