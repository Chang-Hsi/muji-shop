// app/utils/request.ts

type RequestMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

type QueryValue = string | number | boolean | null | undefined;

type QueryParams = Record<string, QueryValue | QueryValue[]>;

type RequestBody =
  | Record<string, unknown>
  | FormData
  | Blob
  | ArrayBuffer
  | URLSearchParams
  | string
  | null
  | undefined;

type RequestResponseType = "json" | "blob";

type RequestOptions = {
  method?: RequestMethod;
  params?: QueryParams;
  body?: RequestBody;
  headers?: Record<string, string>;
  responseType?: RequestResponseType;

  /**
   * 預設會自動帶 _PmToken。
   * 如果某支 API 明確不需要 token，可以傳 auth: false。
   */
  auth?: boolean;
};

type ApiErrorData = {
  message?: unknown;
  Message?: unknown;
  error?: unknown;
};

type ApiErrorLike = {
  message?: unknown;
  data?: ApiErrorData;
  response?: {
    _data?: ApiErrorData;
  };
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function isApiErrorLike(error: unknown): error is ApiErrorLike {
  return isRecord(error);
}

function getStringMessage(value: unknown) {
  return typeof value === "string" && value.trim() ? value : "";
}

function getApiErrorMessage(error: unknown) {
  if (!isApiErrorLike(error)) {
    return "API 請求失敗";
  }

  const responseMessage = getStringMessage(error.response?._data?.message);
  const responseMessageUpper = getStringMessage(error.response?._data?.Message);
  const dataMessage = getStringMessage(error.data?.message);
  const dataMessageUpper = getStringMessage(error.data?.Message);
  const dataError = getStringMessage(error.data?.error);
  const errorMessage = getStringMessage(error.message);

  return (
    responseMessage ||
    responseMessageUpper ||
    dataMessage ||
    dataMessageUpper ||
    dataError ||
    errorMessage ||
    "API 請求失敗"
  );
}

function getRequestBody(body: RequestBody) {
  if (body === null || body === undefined) {
    return undefined;
  }

  return body;
}

export async function request<T = unknown>(
  url: string,
  options: RequestOptions = {},
): Promise<T> {
  const config = useRuntimeConfig();

  // 調整：避免 config.public.apiBase 被推成 {}，導致 baseURL 報錯
  const apiBase = config.public.apiBase;
  const baseURL = typeof apiBase === "string" ? apiBase : "";

  const isFormData = options.body instanceof FormData;

  const defaultHeaders: Record<string, string> = isFormData
    ? {}
    : {
        "Content-Type": "application/json",
      };

  const token = useCookie<string | null>("_PmToken");

  const authHeaders: Record<string, string> =
    options.auth === false || !token.value
      ? {}
      : {
          _PmToken: token.value,
        };

  try {
    const response = await $fetch<T>(url, {
      baseURL: baseURL || undefined,
      method: options.method || "GET",
      query: options.params,
      body: getRequestBody(options.body),
      responseType: options.responseType,
      headers: {
        ...defaultHeaders,
        ...authHeaders,
        ...options.headers,
      },
    });

    return response as T;
  } catch (error: unknown) {
    console.error("API request error:", error);

    const message = getApiErrorMessage(error);

    throw new Error(message, {
      cause: error,
    });
  }
}
