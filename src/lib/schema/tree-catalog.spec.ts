import { CatalogData } from './catalog-abstract'
import { TreeCatalog } from './tree-catalog'

describe(`${TreeCatalog.name}`, () => {
  const data: CatalogData<'id', { id: string; children: string[] }> = {
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
    const treeStore = new TreeCatalog(data, 'rootId', 'id')

    treeStore.remove('childId2')

    console.log(treeStore.data)
  })
})
