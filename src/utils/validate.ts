export function validate(
  fns: ((input: unknown) => void)[]
): (input: unknown) => string | undefined {
  return (input: unknown) => {
    for (let index = 0; index < fns.length; index++) {
      const validator = fns[index]

      try {
        validator(input)
      } catch (error) {
        if (error instanceof Error) {
          return error.message
        }
      }
    }
  }
}
