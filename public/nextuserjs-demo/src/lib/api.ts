export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function apiFetch<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const isFormData = options.body instanceof FormData;

  let headers: Record<string, string> = {};

  if (options.headers instanceof Headers) {
    options.headers.forEach((value, key) => {
      headers[key] = value;
    });
  } else if (Array.isArray(options.headers)) {
    options.headers.forEach(([key, value]) => {
      headers[key] = value;
    });
  } else if (options.headers) {
    headers = { ...options.headers as Record<string, string> };
  }

  if (!isFormData) {

    headers['Content-Type'] = 'application/json';
  }

  const res = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
    credentials: 'include',
    cache: 'no-store',
  });

  if (!res.ok) {
    const error = await res.text();
    let message = 'Error en la petición';
    try {
      const parsed = JSON.parse(error);
      message = parsed.message || message;
    } catch (_) {}
    throw new Error(message);
  }

  const text = await res.text();

  return text ? JSON.parse(text) : ({} as T);
}
