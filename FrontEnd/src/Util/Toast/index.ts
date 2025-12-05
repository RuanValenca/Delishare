import { errorToast, successToast } from "../../components/Toast";

// Sistema para evitar toasts duplicados
const recentToasts = new Set<string>();
const TOAST_COOLDOWN = 2000; // 2 segundos

function addToastToCache(message: string): boolean {
  const key = `${Date.now()}-${message}`;
  const now = Date.now();
  
  // Remove toasts antigos do cache
  const keysToRemove: string[] = [];
  recentToasts.forEach((cachedKey) => {
    const timestamp = parseInt(cachedKey.split("-")[0]);
    if (now - timestamp > TOAST_COOLDOWN) {
      keysToRemove.push(cachedKey);
    }
  });
  keysToRemove.forEach((key) => recentToasts.delete(key));
  
  // Verifica se já existe um toast similar recente
  const messageKey = message.toLowerCase().trim();
  for (const cachedKey of recentToasts) {
    const cachedMessage = cachedKey.split("-").slice(1).join("-").toLowerCase().trim();
    if (cachedMessage === messageKey) {
      return false; // Toast duplicado, não mostrar
    }
  }
  
  recentToasts.add(key);
  return true; // Pode mostrar o toast
}

export function toastMessage(message: string | string[], success?: boolean) {
  if (message && message.length <= 0) return;

  if (typeof message === "string") {
    if (addToastToCache(message)) {
      return message && (success ? successToast(message) : errorToast(message));
    }
  } else {
    return message.forEach((text) => {
      if (text && addToastToCache(text)) {
        if (success) {
          successToast(text);
        } else {
          errorToast(text);
        }
      }
    });
  }
}

// defaultReturn agora não mostra toast (comportamento padrão)
export function defaultReturn(request: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
  message: string[];
  result: boolean;
}) {
  return request;
}

// defaultReturnNotToast mantém o mesmo comportamento
export function defaultReturnNotToast(request: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
  message: string[];
  result: boolean;
}) {
  return request;
}

// Nova função para usar apenas em login e config
export function defaultReturnWithToast(request: {
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
