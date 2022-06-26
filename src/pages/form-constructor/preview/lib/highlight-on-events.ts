import { highlightSelected } from './highlight'

export function highlightOnEvents(compIds: string[]) {
  function updateHighlights() {
    window.setTimeout(() => highlightSelected(compIds))
  }

  document.addEventListener('click', updateHighlights)
  document.addEventListener('keydown', updateHighlights)

  return () => {
    document.removeEventListener('click', updateHighlights)
    document.addEventListener('keydown', updateHighlights)
  }
}
