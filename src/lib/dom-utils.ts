//Returns true if it is a DOM node
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isNode(o: any): o is Node {
  return typeof Node === 'object'
    ? o instanceof Node
    : o !== null &&
        typeof o === 'object' &&
        'nodeType' in o &&
        typeof o?.nodeType === 'number' &&
        typeof o?.nodeName === 'string'
}

//Returns true if it is a DOM element
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isElement(o: any): o is HTMLElement {
  return typeof HTMLElement === 'object'
    ? o instanceof HTMLElement //DOM2
    : typeof o === 'object' && o !== null && o?.nodeType === 1 && typeof o?.nodeName === 'string'
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isInputElement(o: any): o is HTMLInputElement {
  return isElement(o) && o.tagName?.toUpperCase() === 'INPUT'
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function assertInputElement(o: any): asserts o is HTMLInputElement {
  if (!isInputElement(o)) {
    console.log(o.tagName)

    throw new Error('Is not input element')
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getValue(e: any) {
  return e?.target?.value
}

export function removeFocus() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (document as any)?.activeElement?.blur()
}

export function removeSelection() {
  if (window.getSelection) {
    if (window.getSelection()?.empty) {
      // Chrome
      window.getSelection()?.empty()
    } else if (window.getSelection()?.removeAllRanges) {
      // Firefox
      window.getSelection()?.removeAllRanges()
    }
  }
}
