// TODO в дальнейшем тут будет обрабатывать unauthorized ошибка

export type ApiFetchInit = Omit<RequestInit, 'body'> & { body: Record<string, unknown> | unknown[] }

export default async function apiFetch(url: string, init?: ApiFetchInit) {
  const res = await fetch(url, {
    ...init,
    body: init?.body ? JSON.stringify(init?.body) : undefined,
  })

  const body = await res.json()

  return {
    ...res,
    body,
  }
}
