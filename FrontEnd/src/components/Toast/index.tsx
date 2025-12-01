import toast from "react-hot-toast";

export function successToast(message: string) {
  toast.success(message, {
    duration: 4000,
    position: "top-right",
  });
}

export function errorToast(message: string) {
  toast.error(message, {
    duration: 5000,
    position: "top-right",
  });
}

export function infoToast(message: string) {
  toast(message, {
    duration: 4000,
    position: "top-right",
    icon: "ℹ️",
  });
}

export function warningToast(message: string) {
  toast(message, {
    duration: 5000,
    position: "top-right",
    icon: "⚠️",
  });
}
