export function createCatalog<TListItem extends Record<string, any>>(
  list: TListItem[],
  key: keyof TListItem
): Record<TListItem[typeof key], TListItem> {
  return list.reduce<Record<string, TListItem>>((acc, item) => {
    const name = item[key] as string
    acc[name] = item
    return acc
  }, {})
}
