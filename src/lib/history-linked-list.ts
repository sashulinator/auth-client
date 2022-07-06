import { DoublyLinkedList, DoublyLinkedListNode } from '@datastructures-js/linked-list'

export class HistoryLinkedList<T> extends DoublyLinkedList<T> {
  onInsertedLast!: () => void
  index = 0

  getIndex() {
    return this.index
  }

  isPrevCurrent() {
    return !!this.getNodeByIndex(this.index - 1)
  }

  isNextCurrent() {
    return !!this.getNodeByIndex(this.index + 1)
  }

  getMaxIndex(): number {
    return this.count() - 1
  }

  setIndex(num: number) {
    this.index = num
  }

  current(): DoublyLinkedListNode<T> {
    return this.getNodeByIndex(this.index)
  }

  insertLast(data: T) {
    if (this.count() - 1 > this.index) {
      this.removeEach((node, position) => position > this.index)
    }

    const res = super.insertLast(data)

    this.setIndex(this.getMaxIndex())
    this.onInsertedLast()
    return res
  }

  getNodeByIndex(num: number): DoublyLinkedListNode<T> {
    let value = null

    try {
      this.forEachReverse((node, position) => {
        if (position === num) {
          value = node
          throw new Error()
        }
      })
    } catch (e) {
      return (value as unknown) as DoublyLinkedListNode<T>
    }

    return (value as unknown) as DoublyLinkedListNode<T>
  }
}
