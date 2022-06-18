import { TreeData, TreeStore } from './tree-store'

describe(`${TreeStore.name}`, () => {
  const data: TreeData<{ id: string }> = {
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

  it('valid', () => {
    const treeStore = new TreeStore(data, 'rootId')

    console.log('treeStore', treeStore.data)
  })
})
