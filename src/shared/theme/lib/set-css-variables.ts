export function setCSSVariable(key: string, value?: number | string): void {
  value && document.body.style.setProperty(`--${key}`, value.toString())
}

export const setCSSVariables = (theme: Record<string, string | number | undefined>): void => {
  document.body.parentElement?.setAttribute('style', '')

  Object.entries(theme).forEach(([key, value]) => {
    setCSSVariable(key, value as string)
  })
}
