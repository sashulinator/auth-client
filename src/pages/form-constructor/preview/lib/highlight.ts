import { assertString } from '@savchenko91/schema-validator'

import { AreaClassNames } from '../constants/area-classnames'

export function removeAllHighlights(areaName: string) {
  const el = document.querySelector(`.${areaName}`)

  if (el !== null) {
    el.innerHTML = ''
  }
}

export function highlightSelected(ids: (string | number)[], ms = 200) {
  highlightFactory(ids, AreaClassNames.selector, ms)
}

export function highlightHovered(id: string | number, ms = 200) {
  highlightFactory([id], AreaClassNames.hover, ms)
}

function highlightFactory(ids: (string | number)[], areaName: string, ms: number) {
  if (ids.length === 0) {
    return
  }

  if (ids.length === 1) {
    assertString(ids[0]?.toString())
    highlightOne(ids[0]?.toString(), areaName, ms)
    return
  }

  removeAllHighlights(areaName)
  highlightMany(ids, areaName)
}

function highlightMany(ids: (string | number)[], areaName: string) {
  const areaEl = document.querySelector<HTMLDivElement>(`.${areaName}`)

  ids.forEach((id) => {
    const hightlightingEl = document.createElement('div')
    highlight(id.toString(), hightlightingEl, 0)
    areaEl?.appendChild(hightlightingEl)
  })
}

function highlightOne(id: string, areaName: string, ms: number) {
  const areaEl = document.querySelector<HTMLDivElement>(`.${areaName}`)
  const highlightingNodeList = document.querySelectorAll<HTMLDivElement>(`.${areaName} *`)

  if (highlightingNodeList.length > 1) {
    removeAllHighlights(areaName)
  }

  const possibleHighlightingEl = document.querySelector<HTMLDivElement>(`.${areaName} *`)

  const isAlreadyExist = !!possibleHighlightingEl
  const hightlightingEl = possibleHighlightingEl ? possibleHighlightingEl : document.createElement('div')

  highlight(id, hightlightingEl, ms)

  if (isAlreadyExist) {
    return
  }

  areaEl?.appendChild(hightlightingEl)
}

function highlight(id: string, hightlightingEl: HTMLDivElement, ms: number) {
  // TODO substitute Preview to highlightable and add it to Header also
  const componentEl = document.querySelector<HTMLDivElement>(`.Preview [data-comp-id="${id}"]`)

  if (componentEl === null) {
    return
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { offsetTop, offsetLeft } = componentEl
  const { width, height } = getComputedStyle(componentEl)

  hightlightingEl.style.position = 'absolute'
  hightlightingEl.style.width = width
  hightlightingEl.style.height = height
  hightlightingEl.style.left = `${offsetLeft}px`
  hightlightingEl.style.top = `${offsetTop}px`

  if (ms !== 0) {
    hightlightingEl.style.transition = `${ms}ms`
    setTimeout(() => (hightlightingEl.style.transition = `0`), ms)
  }
}
