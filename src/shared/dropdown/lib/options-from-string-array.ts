export default function optionsFromStringArray(arr: string[], t?: (s: string) => string) {
  return arr.map((string) => ({
    text: t ? t(string.toString()) : string,
    key: string,
  }))
}
