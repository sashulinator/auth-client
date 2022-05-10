export default function isInputType<T extends { type: string }>(input: T): boolean {
  return input.type === 'input' || input.type === 'checkbox'
}
