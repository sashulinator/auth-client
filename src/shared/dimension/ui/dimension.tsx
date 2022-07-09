import { Panel, PanelType } from '@fluentui/react'
import { assertNotUndefined, isString } from '@savchenko91/schema-validator'

import './dimension.css'

import React, { useEffect, useState } from 'react'

import { findParents } from '@/lib/entity-actions'
import { isEnter } from '@/lib/key-events'
import { TreeCheckbox } from '@/shared/checkbox'
import FieldBorder from '@/shared/field-border.ts'
import { CompSchema, FieldComponentContext, LinkedComp, assertLinkedComp } from '@/shared/schema-drawer'

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
  const [value, setValue] = useState(isString(props.value) ? undefined : props.value)

  useEffect(() => setValue(value), [props.value])

  const compsAndSchemas = props.context.comp.children?.reduce<[LinkedComp, CompSchema][]>((acc, id) => {
    const comp = props.context.comps[id]
    assertLinkedComp(comp)

    const schema = props.context.schemas[comp.linkedSchemaId]

    if (schema) {
      acc.push([comp, schema])
    }

    return acc
  }, [])

  function onChange(name: string, data: string[]) {
    setValue((value) => {
      const newValue = {
        ...value,
        [name]: data,
      }
      props.onChange(newValue)
      return newValue
    })
  }

  return (
    <FieldBorder
      tabIndex={0}
      onKeyDown={(e) => isEnter(e) && setOpen(true)}
      onDoubleClick={() => setOpen(true)}
      className="Dimension"
    >
      <div>
        <table>
          <tbody>
            {compsAndSchemas?.map(([comp, schema]) => {
              return (
                <tr key={schema.id}>
                  <td>{comp?.title}:</td>
                  <td className="column dimensionColumn">
                    {value?.[schema?.title]?.map((id) => {
                      const entity = schema.data[id] as LinkedComp
                      assertNotUndefined(entity)
                      const parents = (findParents(id, schema.data) || []) as LinkedComp[]
                      return <div key={id}>{[...parents, entity]?.map(({ title }) => title).join('> ')}</div>
                    })}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
      <Panel
        type={PanelType.customNear}
        customWidth={'720px'}
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
                onChange={(data: string[]) => onChange(schema.title, data)}
                multiselect={comp.props?.multiselect}
              />
            )
          })}
        </div>
      </Panel>
    </FieldBorder>
  )
}
