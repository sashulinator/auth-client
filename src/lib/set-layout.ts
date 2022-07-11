import { assertNotNull } from '@savchenko91/schema-validator'

import { useLayoutEffect } from 'react'

export enum LayoutNames {
  main = 'mainLayout',
  headerMain = 'headerMainLayout',
  headerNavMain = 'headerNavMainLayout',
}

export function setLayout(layoutName?: LayoutNames) {
  const layoutEl = document.querySelector('#Layout')
  assertNotNull(layoutEl)

  Object.values(LayoutNames).forEach((iLayoutName) => {
    layoutEl.classList.remove(iLayoutName)
  })

  layoutName ? layoutEl.classList.add(layoutName) : setTimeout(() => setLayout(layoutName))
}

export function useSetLayout(layoutName?: LayoutNames) {
  useLayoutEffect(() => {
    setTimeout(() => setLayout(layoutName))
  }, [])
}
