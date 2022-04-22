import { PrimaryButton, Stack } from '@fluentui/react'
import { isString } from '@savchenko91/schema-validator'

import formSchema from './form-schema.json'
import React, { FC } from 'react'

const hashComponents = {
  Stack,
  PrimaryButton,
} as any

const Preview: FC = (): JSX.Element => {
  return <div className="Preview">{formSchema.children.map(drawChildren)}</div>
}

const drawChildren = (item: any) => {
  if (isString(item)) {
    return item
  }
  const Comp = hashComponents[item.name]
  let drawedChildren
  if (item.children) {
    drawedChildren = item.children.map(drawChildren)
  }

  return <Comp {...item.props}>{drawedChildren}</Comp>
}

export default Preview
