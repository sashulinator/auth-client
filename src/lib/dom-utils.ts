//Returns true if it is a DOM node
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
export function isElement(o: any): o is HTMLElement {
  return typeof HTMLElement === 'object'
    ? o instanceof HTMLElement //DOM2
    : typeof o === 'object' && o !== null && o?.nodeType === 1 && typeof o?.nodeName === 'string'
}

export function isInputElement(o: any): o is HTMLInputElement {
  return isElement(o) && o.tagName?.toUpperCase() === 'INPUT'
}

export function assertInputElement(o: any): asserts o is HTMLInputElement {
  if (!isInputElement(o)) {
    console.log(o.tagName)

    throw new Error('Is not input element')
  }
}
