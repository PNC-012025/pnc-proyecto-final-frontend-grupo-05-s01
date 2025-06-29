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

  const text = await res.text();

  if (!res.ok) {
    try {
      const parsed = JSON.parse(text);
      const error = new Error('Error en la petición');
      if (typeof parsed === 'object' && parsed !== null) {
        if (Array.isArray(parsed)) {
          (error as any).details = parsed;
        } else {
          (error as any).details = Object.values(parsed).flatMap(value =>
            Array.isArray(value) ? value : [value]
          );
        }
      } else {
        (error as any).details = [text];
      }

      throw error;
    } catch {
      throw new Error(text || 'Error en la petición');
    }
  }

  return text ? JSON.parse(text) : ({} as T);
}
