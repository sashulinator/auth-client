import { isEnter } from '@/lib/key-events'

export function createPressEnterOnLabelHandler(
  itemId: string,
  currentBindingFormSelector: string,
  selectItemId: React.Dispatch<React.SetStateAction<string>>
) {
  return (e: React.KeyboardEvent) => {
    if (isEnter(e)) {
      selectItemId(itemId.toString())

      setTimeout(() => {
        const el = document.querySelector<HTMLInputElement>(
          `.${currentBindingFormSelector}  [data-is-focusable="true"]`
        )
        const el2 = document.querySelector<HTMLInputElement>(`.${currentBindingFormSelector} input`)

        setTimeout(() => (el || el2)?.focus())
      })
    }
  }
}
