export function hasId(input: unknown): input is { id: string } {
  return !!(input as { id: string })?.id
}
