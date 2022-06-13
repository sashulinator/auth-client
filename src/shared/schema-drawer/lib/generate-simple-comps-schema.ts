import { BasicComponentsNames } from '../constants/basic-components-schemas'
import { Catalog, Comp, Schema, SchemaType } from '../model/types'

import { ROOT_ID } from '@/constants/common'

type SimpleComp = Omit<Comp, 'title' | 'compSchemaId' | 'children'> & {
  compSchemaId: BasicComponentsNames
  children?: SimpleComp[]
}

export function generateSimpleCompsSchema(simpleComps: SimpleComp[]): Schema {
  function simpleCompToComp(
    acc: Catalog<Comp> | undefined,
    simpleComp: SimpleComp | undefined
  ): Catalog<Comp> | undefined {
    if (simpleComp === undefined) {
      return undefined
    }

    return {
      [simpleComp.id]: {
        ...simpleComp,
        title: 'hereCouldBeYourAd',
        children: simpleComp.children?.map((eComp) => eComp.id) || [],
      },
      ...simpleComp.children?.reduce<Catalog<Comp> | undefined>(simpleCompToComp, {}),
      ...acc,
    }
  }

  const schema: Schema = {
    id: 'hereCouldBeYourAd',
    title: 'hereCouldBeYourAd',
    componentName: null,
    type: SchemaType.FORM,
    comps: {
      [ROOT_ID]: {
        id: ROOT_ID,
        title: 'stackRoot',
        name: 'hello',
        children: simpleComps.map((eComp) => eComp.id),
        props: { tokens: { padding: '5px', childrenGap: '24px' } },
        compSchemaId: BasicComponentsNames.Stack,
      },
      ...simpleComps.reduce<Catalog<Comp> | undefined>(simpleCompToComp, {}),
    },
  }

  return schema
}
