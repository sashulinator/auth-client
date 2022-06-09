export interface DoublyLinkedList<Data> {
  prev: null | DoublyLinkedList<Data>
  next: null | DoublyLinkedList<Data>
  data: Data
}
