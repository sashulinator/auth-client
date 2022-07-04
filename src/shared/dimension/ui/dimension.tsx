import { Panel, PanelType, PrimaryButton } from '@fluentui/react'

import './dimension.css'

import Tree from './tree'
import React, { useState } from 'react'

import { CompSchema, FieldComponentContext, assertLinkedComp } from '@/shared/schema-drawer'

interface DimensionProps {
  value: string[] | string | undefined
  children: string[]
  context: FieldComponentContext
}

DimensionComp.defaultValues = {
  schemas: {},
}

export default function DimensionComp(props: DimensionProps): JSX.Element {
  const [isOpen, setOpen] = useState(false)

  const schemas = props.context.comp.children?.reduce<CompSchema[]>((acc, id) => {
    const comp = props.context.comps[id]
    assertLinkedComp(comp)

    const schema = props.context.schemas[comp.linkedSchemaId]
    if (schema) {
      acc.push(schema)
    }

    return acc
  }, [])

  return (
    <div className="Dimension">
      {'value?.join()'}
      <PrimaryButton onClick={() => setOpen(true)} />
      <Panel
        type={PanelType.customNear}
        customWidth={'920px'}
        className="DimensionModal"
        isOpen={isOpen}
        onDismiss={() => setOpen(false)}
      >
        <div className="rootContainer">
          {schemas?.map((schema) => {
            return <Tree key={schema.id} schema={schema} />
          })}
        </div>
      </Panel>
    </div>
  )
}
