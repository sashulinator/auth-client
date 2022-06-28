import { Panel, PanelType, PrimaryButton } from '@fluentui/react'
import { isString } from '@savchenko91/schema-validator'

import './dimension.css'

import Tree from './tree'
import React, { useState } from 'react'

import { Catalog, CompSchema } from '@/shared/schema-drawer'

interface DimensionProps {
  schemas: Catalog<CompSchema>
  value: string[] | string | undefined
}

DimensionComp.defaultValues = {
  schemas: {},
}

export default function DimensionComp(props: DimensionProps): JSX.Element {
  const [isOpen, setOpen] = useState(false)
  const value = isString(props.value) ? undefined : props.value

  console.log('value', value)

  console.log('tree', props.schemas)
  return (
    <div className="Dimension">
      {'value?.join()'}
      <PrimaryButton onClick={() => setOpen(true)} />
      <Panel
        type={PanelType.customNear}
        customWidth={'1200px'}
        className="DimensionModal"
        isOpen={isOpen}
        onDismiss={() => setOpen(false)}
      >
        <div className="rootContainer">
          {Object.values(props.schemas || {}).map((schema) => {
            return <Tree key={schema.id} schema={schema} />
          })}
        </div>
      </Panel>
    </div>
  )
}
