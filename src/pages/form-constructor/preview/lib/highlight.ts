export function removeAllHighlights(areaName: string) {
  const el = document.querySelector(`.${areaName}`)

  if (el !== null) {
    el.innerHTML = ''
  }
}

interface Styles {
  border: string
  opacity: string
}

export function highlightComponent(itemId: string | number, areaName: string, { border, opacity }: Styles) {
  const element = document.querySelector(`.Preview [data-comp-id="${itemId}"]`)
  const previewEl = document.querySelector(`.${areaName}`)

  if (element === null || previewEl === null) {
    return
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
  elementSelector.style.border = border
  elementSelector.style.opacity = opacity

  previewEl.appendChild(elementSelector)
}

export function removeAllHoverHighlights() {
  removeAllHighlights('hoverArea')
}

export function removeAllSelectionHighlights() {
  removeAllHighlights('selectorArea')
}

export function highlightHover(itemId: string | number) {
  highlightComponent(itemId, 'hoverArea', {
    border: '2px dashed var(--themePrimary)',
    opacity: '1',
  })
}

export function highlightSelection(itemId: string | number) {
  highlightComponent(itemId, 'selectorArea', {
    border: '2px solid var(--themePrimary)',
    opacity: '0.7',
  })
}
