import { addChildId, addComp, copyComps, findCompPosition, moveComp, removeChildId } from './mutators'

import { Comp, Norm } from '@/common/types'

describe('mutators', () => {
  it(copyComps.name, () => {
    const comps = ({
      id1: { id: 'id1', compSchemaId: 'test' },
      id2: { id: 'id2', compSchemaId: 'test2' },
    } as unknown) as Norm<Comp>

    const copiedComps = copyComps(comps)

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

  it(findCompPosition.name, () => {
    const comps = {
      id1: { id: 'id1', childCompIds: ['id3', 'id2'] },
      id2: { id: 'id2' },
      id3: { id: 'id3' },
    }

    const position = findCompPosition(comps.id2.id, (comps as unknown) as Norm<Comp>)

    expect(position).toEqual({ index: 1, parentId: 'id1' })
  })

  it(addChildId.name, () => {
    const comp = { id: 'id1', childCompIds: ['id3', 'id2'] }

    const newComp = addChildId((comp as unknown) as Comp, 'id4', 1)

    expect(newComp).toEqual({ id: 'id1', childCompIds: ['id3', 'id4', 'id2'] })
  })

  describe(removeChildId.name, () => {
    it('removes by Id', () => {
      const comp = { id: 'id1', childCompIds: ['id3', 'id2', 'id4', 'id6'] }

      const newComp = removeChildId((comp as unknown) as Comp, 'id4')

      expect(newComp).toEqual({ id: 'id1', childCompIds: ['id3', 'id2', 'id6'] })
    })

    it('removes by index', () => {
      const comp = { id: 'id1', childCompIds: ['id3', 'id2', 'id4', 'id6'] }

      const newComp = removeChildId((comp as unknown) as Comp, 2)

      expect(newComp).toEqual({ id: 'id1', childCompIds: ['id3', 'id2', 'id6'] })
    })

    it.only('removes childCompIds if empty', () => {
      const comp = ({ id: 'id1', childCompIds: ['id3'] } as unknown) as Comp

      const newComp1 = removeChildId(comp, 'id3')
      const newComp2 = removeChildId(comp, 0)

      expect(newComp1).toEqual({ id: 'id1' })
      expect(newComp2).toEqual({ id: 'id1' })
    })
  })

  describe(addComp.name, () => {
    it('move comp', () => {
      const comps = ({
        id1: { id: 'id1', childCompIds: ['id2', 'id3'] },
        id2: { id: 'id2' },
        id3: { id: 'id3', childCompIds: ['id4'] },
        id4: { id: 'id4' },
      } as unknown) as Norm<Comp>

      const comp = ({ id: 'id5' } as unknown) as Comp

      const newComp = addComp(comp, 'id3', 1, comps)

      expect(newComp).toEqual({
        id1: { id: 'id1', childCompIds: ['id2', 'id3'] },
        id2: { id: 'id2' },
        id3: { id: 'id3', childCompIds: ['id4', 'id5'] },
        id4: { id: 'id4' },
        id5: { id: 'id5' },
      })
    })
  })

  describe(moveComp.name, () => {
    const comps = ({
      id1: { id: 'id1', childCompIds: ['id2', 'id3', 'id4'] },
      id2: { id: 'id2' },
      id3: { id: 'id3' },
      id4: { id: 'id4' },
    } as unknown) as Norm<Comp>

    const comp = ({ id: 'id4' } as unknown) as Comp

    it('move comp', () => {
      const newComp = moveComp(comp, 'id3', 0, comps)

      expect(newComp).toEqual({
        id1: { id: 'id1', childCompIds: ['id2', 'id3'] },
        id2: { id: 'id2' },
        id3: { id: 'id3', childCompIds: ['id4'] },
        id4: { id: 'id4' },
      })
    })

    it('move comp inside parent', () => {
      const newComp = moveComp(comp, 'id1', 1, comps)

      expect(newComp).toEqual({
        id1: { id: 'id1', childCompIds: ['id2', 'id4', 'id3'] },
        id2: { id: 'id2' },
        id3: { id: 'id3' },
        id4: { id: 'id4' },
      })
    })
  })
})
