import { Checkbox, PrimaryButton, Stack } from '@fluentui/react'
import { isString } from '@savchenko91/schema-validator'

import formSchema from './form-schema.json'
import React, { FC } from 'react'

import CustomTextField from '@/components/text-field'

const hashComponents = {
  Stack,
  Checkbox,
  TextField: CustomTextField,
  PrimaryButton,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
} as any

const Preview: FC = (): JSX.Element => {
  return <div className="Preview">{formSchema.children.map(drawChildren)}</div>
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const drawChildren = (item: any, i?: number) => {
  if (isString(item)) {
    return item
  }
  const Comp = hashComponents[item.name]
  let drawedChildren
  if (item.children) {
    drawedChildren = item.children.map(drawChildren)
  }

  return (
    <Comp key={item?.path || i} {...item.props}>
      {drawedChildren}
    </Comp>
  )
}

export default Preview
