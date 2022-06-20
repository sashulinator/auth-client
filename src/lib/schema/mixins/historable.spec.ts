import { Catalog } from '../catalog'
import { Historable } from './historable'

describe(`${Historable.name}`, () => {
  const initialData = { id: { id: 'id' } }

  const HistorableCatalog = Historable(Catalog)
  const catalog = new HistorableCatalog(initialData, 'id')

  it('prev', () => {
    const newData1 = { id1: { id: 'id1' } }
    const newData2 = { id2: { id: 'id2' } }

    catalog.setData(newData1)
    expect(catalog.data).toEqual(newData1)
    catalog.setData(newData2)
    expect(catalog.data).toEqual(newData2)

    catalog.prev()
    catalog.prev()

    expect(catalog.data).toEqual(initialData)
  })

  it('next', () => {
    const newData1 = { id1: { id: 'id1' } }
    const newData2 = { id2: { id: 'id2' } }

    catalog.setData(newData1)
    catalog.setData(newData2)

    catalog.prev()
    catalog.prev()

    catalog.next()

    expect(catalog.data).toEqual(newData1)
  })
})
