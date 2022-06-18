import { StoreData } from './store-abstract'
import { TreeStore } from './tree-store'

describe(`${TreeStore.name}`, () => {
  const data: StoreData<'id', { id: string; children: string[] }> = {
    rootId: {
      id: 'rootId',
      children: ['childId1'],
    },
    childId1: {
      id: 'childId1',
      children: ['childId2'],
    },
    childId2: {
      id: 'childId2',
      children: [],
    },
  }

  it('remove', () => {
    const treeStore = new TreeStore(data, 'rootId', 'id')

    treeStore.remove('childId2')

    console.log(treeStore.data)
  })
})
