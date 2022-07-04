import { Panel, PanelType, PrimaryButton } from '@fluentui/react'
import { isString } from '@savchenko91/schema-validator'

import './dimension.css'

import React, { useState } from 'react'

import { TreeCheckbox } from '@/shared/checkbox'
import { CompSchema, DimensionComp, FieldComponentContext, assertLinkedComp } from '@/shared/schema-drawer'

interface DimensionProps {
  value: Record<string, string[]> | string | undefined
  children: string[]
  context: FieldComponentContext
  onChange: (value: Record<string, string[]>) => void
}

Dimension.defaultValues = {
  schemas: {},
}

export default function Dimension(props: DimensionProps): JSX.Element {
  const [isOpen, setOpen] = useState(false)
  const value = isString(props.value) ? undefined : props.value

  const compsAndSchemas = props.context.comp.children?.reduce<[DimensionComp, CompSchema][]>((acc, id) => {
    const comp = props.context.comps[id]
    assertLinkedComp(comp)

    const schema = props.context.schemas[comp.linkedSchemaId]

    if (schema) {
      acc.push([comp as DimensionComp, schema])
    }

    return acc
  }, [])

  function onChange(name: string) {
    return (data: string[]) => {
      props.onChange({
        ...value,
        [name]: data,
      })
    }
  }

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
          {compsAndSchemas?.map(([comp, schema]) => {
            return (
              <TreeCheckbox
                key={schema.id}
                name={schema.title}
                value={value?.[schema.title] || []}
                schema={schema}
                onChange={onChange(schema.title)}
                multiselect={comp.props?.multiselect}
              />
            )
          })}
        </div>
      </Panel>
    </div>
  )
}
