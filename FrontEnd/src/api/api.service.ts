/* eslint-disable @typescript-eslint/no-explicit-any */
import { apiURL } from "../env/index";
import { defaultReturnNotToast } from "../Util/Toast";

const lastCalls = new Map<
  string,
  { timestamp: number; promise: Promise<any> }
>();

// Função para controlar o loading global
let setLoadingGlobal: ((loading: boolean) => void) | null = null;

export const setLoadingHandler = (handler: (loading: boolean) => void) => {
  setLoadingGlobal = handler;
};

export const apiRequest = async (
  endpoint: string,
  method: string = "GET",
  body?: object | FormData | null,
  type?: "file" | "object"
) => {
  const key = endpoint + JSON.stringify(body);
  const now = Date.now();

  const lastCall = lastCalls.get(key);

  if (lastCall && now - lastCall.timestamp < 1000) {
    // Se for uma requisição em cache, não mostra loading
    return lastCall.promise;
  }

  // Mostra loading apenas para novas requisições
  if (setLoadingGlobal) {
    setLoadingGlobal(true);
  }

  const promise = (async () => {
    const headers = new Headers();
    let bodyRequest: BodyInit | null = null;

    if (type === "file") {
      bodyRequest = body as FormData;
    } else {
      bodyRequest = body ? JSON.stringify(body) : null;
      headers.set("Content-Type", "application/json");
    }

    const requestOptions: RequestInit = {
      method,
      mode: "cors",
      credentials: "include",
      headers,
      body: bodyRequest,
    };

    try {
      const response = await fetch(apiURL + endpoint, requestOptions);

      // -------------------------------
      //       ERROS COM TOAST
      // -------------------------------
      if (!response.ok) {
        console.error("Erro na requisição:", response.status);

        try {
          const errorData = await response.json();

          // se a API retornar message → retorna sem toast
          if (errorData?.message) {
            return defaultReturnNotToast({
              data: errorData.data ?? [],
              result: false,
              message: Array.isArray(errorData.message)
                ? errorData.message
                : [errorData.message],
            });
          }
        } catch {
          // Erro inesperado - sem toast
        }

        // se não veio JSON → retorna sem toast
        return defaultReturnNotToast({
          data: [],
          result: false,
          message: [],
        });
      }

      // -------------------------------
      //         SUCESSO
      // -------------------------------
      const json = await response.json();

      // caso a API retorne estrutura padrão
      if (json?.message && typeof json.result === "boolean") {
        return defaultReturnNotToast(json);
      }

      return json;
    } catch (error) {
      console.error("Erro de rede:", error);

      return defaultReturnNotToast({
        data: [],
        result: false,
        message: ["Erro de rede"],
      });
    }
  })();

  lastCalls.set(key, { timestamp: now, promise });

  // Garante que o loading seja escondido quando a requisição terminar
  promise.finally(() => {
    if (setLoadingGlobal) {
      setLoadingGlobal(false);
    }
  });

  setTimeout(() => {
    const stored = lastCalls.get(key);
    if (stored && stored.promise === promise) lastCalls.delete(key);
  }, 5000);

  return promise;
};

export const changeObjectToFormData = (body: Record<string, unknown>) => {
  const formData = new FormData();

  Object.entries(body).forEach(([key, value]) => {
    if (value instanceof File) {
      formData.append(key, value);
      return;
    }

    if (value !== undefined && value !== null) {
      formData.append(key, String(value));
    }
  });

  return formData;
};

