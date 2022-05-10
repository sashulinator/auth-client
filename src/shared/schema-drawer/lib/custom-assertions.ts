import { matchPattern } from '@savchenko91/schema-validator'

interface MatchPatternProps {
  pattern: string
}

export function assertMatchPattern(input: unknown, { pattern }: MatchPatternProps) {
  console.log('pattern', pattern)

  matchPattern(input, pattern.toString())
}
