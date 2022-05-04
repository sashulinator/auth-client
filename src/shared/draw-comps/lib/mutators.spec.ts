import { copyComps, getCompPosition } from './mutators'

import { Comp, Norm } from '@/common/types'

describe('mutators', () => {
  it(copyComps.name, () => {
    const comps = {
      id1: { id: 'id1', compSchemaId: 'test' },
      id2: { id: 'id2', compSchemaId: 'test2' },
    }

    const copiedComps = copyComps((comps as unknown) as Norm<Comp>)

    const compEntries = Object.entries(comps)
    const copiedCompEntries = Object.entries(copiedComps)

    copiedCompEntries.forEach(([copiedCompKey, copiedComp], i) => {
      const [compKey, comp] = compEntries[i] as any

      const isSameId = compKey === copiedCompKey || comp.id === copiedComp.id

      if (isSameId) {
        throw Error('Ids must be different')
      }

      if (comp.compSchemaId !== copiedComp.compSchemaId) {
        throw new Error('compSchemaIds must be the same')
      }
    })
  })

  it(getCompPosition.name, () => {
    const comps = {
      id1: { id: 'id1', childCompIds: ['id3', 'id2'] },
      id2: { id: 'id2' },
      id3: { id: 'id3' },
    }

    const position = getCompPosition(comps.id2.id, (comps as unknown) as Norm<Comp>)

    expect(position).toEqual({ index: 1, parentId: 'id1' })
  })
})
