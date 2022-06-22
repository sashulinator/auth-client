import { RenderItemParams, TreeItem } from '@atlaskit/tree'
import { Stack } from '@fluentui/react'

import clsx from 'clsx'
import React from 'react'
import { Field } from 'react-final-form'

import CheckBox from '@/shared/checkbox/ui/checkbox'
import { Comp } from '@/shared/schema-drawer'

type DimensionComp = Pick<Required<Comp>, 'name' | 'id'> & { props: { label: string } }

export interface TreeLeafProps extends RenderItemParams {
  item: Omit<TreeItem, 'data'> & {
    data?: { comp: DimensionComp }
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
        {props.item.data?.comp && (
          <Field<boolean> {...props.item.data?.comp}>
            {({ input }) => <CheckBox {...input} {...props.item.data?.comp.props} />}
          </Field>
        )}
      </Stack>
    </div>
  )
}
