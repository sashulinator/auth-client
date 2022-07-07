// TODO в дальнейшем тут будет обрабатывать unauthorized ошибка

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ApiFetchInit = Omit<RequestInit, 'body'> & { body: Record<string, any> | any[] }

export default async function apiFetch(url: string, init?: Partial<ApiFetchInit>) {
  console.log('allo')

  const res = await fetch(url, {
    ...init,
    body: init?.method?.toUpperCase() === 'GET' || !init?.body ? undefined : JSON.stringify(init?.body),
  })

  console.log('res', res)

  const body = await res.json()

  return {
    ...res,
    body,
  }
}
