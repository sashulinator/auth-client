export default class ErrorFromObject extends Error {
  constructor(error: Record<string, unknown>) {
    super()

    if (error) {
      Object.entries(error).forEach(([key, value]) => {
        // @ts-expect-error obviously
        this[key] = value
      })
    }
  }
}
