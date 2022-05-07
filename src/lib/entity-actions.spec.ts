import {
  Entity,
  addChildId,
  addEntity,
  copyEntities,
  findEntityPosition,
  moveEntity,
  removeChildId,
} from './entity-actions'

import { Norm } from '@/common/types'

describe('mutators', () => {
  it(copyEntities.name, () => {
    const entities = ({
      id1: { id: 'id1' },
      id2: { id: 'id2' },
    } as unknown) as Norm<Entity>

    const copiedEntitys = copyEntities(entities)

    const entityEntries = Object.entries(entities)
    const copiedEntityEntries = Object.entries(copiedEntitys)

    copiedEntityEntries.forEach(([copiedEntityKey, copiedEntity], i) => {
      const [entityKey, entity] = entityEntries[i] as any

      const isSameId = entityKey === copiedEntityKey || entity.id === copiedEntity.id

      if (isSameId) {
        throw Error('Ids must be different')
      }
    })
  })

  it(findEntityPosition.name, () => {
    const entities = {
      id1: { id: 'id1', children: ['id3', 'id2'] },
      id2: { id: 'id2' },
      id3: { id: 'id3' },
    }

    const position = findEntityPosition(entities.id2.id, (entities as unknown) as Norm<Entity>)

    expect(position).toEqual({ index: 1, parentId: 'id1' })
  })

  it(addChildId.name, () => {
    const entity = { id: 'id1', children: ['id3', 'id2'] }

    const newEntity = addChildId((entity as unknown) as Entity, 'id4', 1)

    expect(newEntity).toEqual({ id: 'id1', children: ['id3', 'id4', 'id2'] })
  })

  describe(removeChildId.name, () => {
    it('removes by Id', () => {
      const entity = { id: 'id1', children: ['id3', 'id2', 'id4', 'id6'] }

      const newEntity = removeChildId((entity as unknown) as Entity, 'id4')

      expect(newEntity).toEqual({ id: 'id1', children: ['id3', 'id2', 'id6'] })
    })

    it('removes by index', () => {
      const entity = { id: 'id1', children: ['id3', 'id2', 'id4', 'id6'] }

      const newEntity = removeChildId((entity as unknown) as Entity, 2)

      expect(newEntity).toEqual({ id: 'id1', children: ['id3', 'id2', 'id6'] })
    })

    it.only('removes children if empty', () => {
      const entity = ({ id: 'id1', children: ['id3'] } as unknown) as Entity

      const newEntity1 = removeChildId(entity, 'id3')
      const newEntity2 = removeChildId(entity, 0)

      expect(newEntity1).toEqual({ id: 'id1' })
      expect(newEntity2).toEqual({ id: 'id1' })
    })
  })

  describe(addEntity.name, () => {
    it('move entity', () => {
      const entities = ({
        id1: { id: 'id1', children: ['id2', 'id3'] },
        id2: { id: 'id2' },
        id3: { id: 'id3', children: ['id4'] },
        id4: { id: 'id4' },
      } as unknown) as Norm<Entity>

      const entity = ({ id: 'id5' } as unknown) as Entity

      const newEntity = addEntity(entity, 'id3', 1, entities)

      expect(newEntity).toEqual({
        id1: { id: 'id1', children: ['id2', 'id3'] },
        id2: { id: 'id2' },
        id3: { id: 'id3', children: ['id4', 'id5'] },
        id4: { id: 'id4' },
        id5: { id: 'id5' },
      })
    })
  })

  describe(moveEntity.name, () => {
    const entities = ({
      id1: { id: 'id1', children: ['id2', 'id3', 'id4'] },
      id2: { id: 'id2' },
      id3: { id: 'id3' },
      id4: { id: 'id4' },
    } as unknown) as Norm<Entity>

    const entity = ({ id: 'id4' } as unknown) as Entity

    it('move entity', () => {
      const newEntity = moveEntity(entity, 'id3', 0, entities)

      expect(newEntity).toEqual({
        id1: { id: 'id1', children: ['id2', 'id3'] },
        id2: { id: 'id2' },
        id3: { id: 'id3', children: ['id4'] },
        id4: { id: 'id4' },
      })
    })

    it('move entity inside parent', () => {
      const newEntity = moveEntity(entity, 'id1', 1, entities)

      expect(newEntity).toEqual({
        id1: { id: 'id1', children: ['id2', 'id4', 'id3'] },
        id2: { id: 'id2' },
        id3: { id: 'id3' },
        id4: { id: 'id4' },
      })
    })
  })
})
