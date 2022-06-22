import { RenderItemParams, TreeItem } from '@atlaskit/tree'
import { Stack } from '@fluentui/react'

import clsx from 'clsx'
import React from 'react'
import { Field } from 'react-final-form'

import CheckBox from '@/shared/checkbox/ui/checkbox'
import { Comp } from '@/shared/schema-drawer'

export interface TreeLeafProps extends RenderItemParams {
  item: Omit<TreeItem, 'data'> & {
    data?: { comp: Comp }
  }
}

export default function TreeLeaf(props: TreeLeafProps): JSX.Element {
  return (
    <div
      role="button"
      tabIndex={0}
      data-comp-id={props.item.id}
      className={clsx('NewTreeLeaf', 'DimensionLeaf')}
      {...props.provided.draggableProps}
      {...props.provided.dragHandleProps}
      ref={props.provided.innerRef}
    >
      <Stack className="treeLeafContent" horizontal verticalAlign="center">
        <div className="treeLeafBorder" />
        <Field<boolean> name={props.item.data?.comp.name || ''}>
          {({ input }) => <CheckBox {...props} {...input} />}
        </Field>
      </Stack>
    </div>
  )
}
