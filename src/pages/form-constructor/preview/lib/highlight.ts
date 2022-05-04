export function removeHighlight() {
  const el = document.querySelector(`.selectorArea`)

  if (el !== null) {
    el.innerHTML = ''
  }
}

export function highlightComponent(itemId: string | number) {
  const element = document.querySelector(`.Preview [data-comp-id="${itemId}"]`)
  const previewEl = document.querySelector(`.selectorArea`)

  if (element === null || previewEl === null) {
    return
  }

  previewEl.innerHTML = ''

  const el = element as any

  const { offsetTop, offsetLeft } = el
  const { width, height } = getComputedStyle(element)

  const elementSelector = document.createElement('div')

  elementSelector.style.width = width
  elementSelector.style.height = height
  // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
  elementSelector.style.left = `${offsetLeft - 2}px`
  // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
  elementSelector.style.top = `${offsetTop - 2}px`
  elementSelector.style.position = 'absolute'
  elementSelector.style.border = '2px solid var(--themePrimary)'

  previewEl.appendChild(elementSelector)
}
