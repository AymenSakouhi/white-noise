import { BASEURL } from '@/constants'

interface FetcherOptions {
  url: string
  method?: string
  headers?: Record<string, string>
  body?: BodyInit | null | undefined | Record<string, string>
  token?: string | null
}

export async function fetcher<T>({
  url,
  method = 'GET',
  headers = {},
  body = null,
  token = null,
}: FetcherOptions): Promise<T> {
  const mergedHeaders = {
    ...(token ? { Authorization: `Bearer ${token}` } : {}), // only add token if it exists
    'Content-Type': 'application/json',
    ...headers,
  }

  const config: RequestInit = {
    method,
    headers: mergedHeaders,
    body: body && typeof body === 'object' ? JSON.stringify(body) : body,
  }

  const response = await fetch(`${BASEURL}${url}`, config)
  if (!response.ok && response.status !== 401) {
    throw new Error(`HTTP error! status: ${response.status}`)
  }
  return response.json() as Promise<T>
}
