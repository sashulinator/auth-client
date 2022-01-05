export function required(input: unknown) {
  if (!input) {
    throw new Error('required')
  }
}
