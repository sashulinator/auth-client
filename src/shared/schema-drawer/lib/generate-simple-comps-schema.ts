import { BasicComponentsNames } from '../constants/basic-components-schemas'
import { Comp, CompSchema, CompSchemaType, Dictionary } from '../model/types'

import { ROOT_ID } from '@/constants/common'

type SimpleComp = Omit<Comp, 'title' | 'compSchemaId' | 'children'> & {
  compSchemaId: BasicComponentsNames
  children?: SimpleComp[]
}

export function generateSimpleCompsSchema(simpleComps: SimpleComp[]): CompSchema {
  function simpleCompToComp(
    acc: Dictionary<Comp> | undefined,
    simpleComp: SimpleComp | undefined
  ): Dictionary<Comp> | undefined {
    if (simpleComp === undefined) {
      return undefined
    }

    return {
      [simpleComp.id]: {
        ...simpleComp,
        title: 'hereCouldBeYourAd',
        children: simpleComp.children?.map((eComp) => eComp.id) || [],
      },
      ...simpleComp.children?.reduce<Dictionary<Comp> | undefined>(simpleCompToComp, {}),
      ...acc,
    }
  }

  const schema: CompSchema = {
    id: 'hereCouldBeYourAd',
    title: 'hereCouldBeYourAd',
    componentName: null,
    type: CompSchemaType.FORM,
    data: {
      [ROOT_ID]: {
        id: ROOT_ID,
        title: 'stackRoot',
        name: 'hello',
        children: simpleComps.map((eComp) => eComp.id),
        props: { tokens: { padding: '5px', childrenGap: '24px' } },
        compSchemaId: BasicComponentsNames.Stack,
      },
      ...simpleComps.reduce<Dictionary<Comp> | undefined>(simpleCompToComp, {}),
    },
  }

  return schema
}
