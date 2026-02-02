const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://todo-hackathon3.hf.space";

interface FetchOptions extends RequestInit {
  headers?: Record<string, string>;
}

export async function apiRequest<T>(endpoint: string, options: FetchOptions = {}): Promise<T> {
  const { headers, ...rest } = options;

  const config: RequestInit = {
    ...rest,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
  };

  // Ensure endpoint starts with / if not present
  const normalizedEndpoint = endpoint.startsWith("/") ? endpoint : `/${endpoint}`;
  const url = `${API_URL}${normalizedEndpoint}`;

  const response = await fetch(url, config);

  if (!response.ok) {
    if (response.status === 401) {
      // In a real app, you might trigger a redirect event or handle it via a global listener
      // For now, we'll let the caller or the context handle the error
      if (typeof window !== "undefined") {
         // Optional: window.location.href = "/login";
      }
      throw new Error("Unauthorized");
    }
    
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.detail || `API Request Failed: ${response.statusText}`);
  }

  if (response.status === 204) {
    return {} as T;
  }

  return response.json();
}
