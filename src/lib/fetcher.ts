interface FetcherOptions {
  url: string
  method?: string
  headers?: Record<string, string>
  body?: BodyInit | null | undefined | Record<string, string>
  token?: string | null
}

export async function fetcher({
  url,
  method = 'GET',
  headers = {},
  body = null,
  token = null,
}: FetcherOptions): Promise<unknown> {
  const mergedHeaders = {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
    ...headers,
  }

  const config: RequestInit = {
    method,
    headers: mergedHeaders,
    body: body && typeof body === 'object' ? JSON.stringify(body) : body,
  }

  const response = await fetch(url, config)
  if (!response.ok && response.status !== 401) {
    throw new Error(`HTTP error! status: ${response.status}`)
  }
  return response.json()
}
