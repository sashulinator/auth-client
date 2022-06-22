import { Stack } from '@fluentui/react'

import clsx from 'clsx'
import React from 'react'
import { Field } from 'react-final-form'

import CheckBox from '@/shared/checkbox/ui/checkbox'
import { Comp } from '@/shared/schema-drawer'

type DimensionComp = Pick<Required<Comp>, 'name' | 'id'> & { props: { label: string } }

export interface TreeLeafProps {
  item: {
    data?: { comp: DimensionComp }
  }
}

export default function DimensionNode(props: TreeLeafProps): JSX.Element {
  return (
    <div data-comp-id={props.item.data?.comp.id} className={clsx('NewTreeLeaf', 'DimensionNode')}>
      <label>
        <Stack className="treeLeafContent" horizontal verticalAlign="center">
          <div className="treeLeafBorder" />
          {props.item.data?.comp && (
            <Field<boolean> type="checkbox" {...props.item.data?.comp}>
              {({ input }) => <CheckBox {...input} {...props.item.data?.comp.props} />}
            </Field>
          )}
        </Stack>
      </label>
    </div>
  )
}
