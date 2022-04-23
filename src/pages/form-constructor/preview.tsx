import { Checkbox, PrimaryButton, Stack } from '@fluentui/react'
import { isString } from '@savchenko91/schema-validator'

import React, { FC } from 'react'
import { useRecoilState } from 'recoil'

import CustomTextField from '@/components/text-field'
import { formSchemaData, formSchemaState } from '@/recoil/form-schema'
import { NormSchema } from '@/types/entities'

const hashComponents = {
  Stack,
  Checkbox,
  TextField: CustomTextField,
  PrimaryButton,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
} as any

const Preview: FC = (): JSX.Element => {
  const [formState] = useRecoilState(formSchemaState)
  return <div className="Preview">{formSchemaData.schema.map(drawChildren)}</div>

  function drawChildren(rawItem?: any, i?: number) {
    if (rawItem === undefined) {
      return null
    }
    if (isString(rawItem)) {
      return rawItem
    }
    const item = formState[rawItem.id] as NormSchema
    const Comp = hashComponents[item?.name]
    let drawedChildren
    if (item.children) {
      drawedChildren = item.children.map(drawChildren)
    }

    return (
      <Comp key={i} {...item?.props}>
        {drawedChildren}
      </Comp>
    )
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const drawChildren = (item?: any, i?: number) => {
  if (item === undefined) {
    return null
  }
  if (isString(item)) {
    return item
  }
  const Comp = hashComponents[item?.name]
  let drawedChildren
  if (item.children) {
    drawedChildren = item.children.map(drawChildren)
  }

  return (
    <Comp key={item?.path || i} {...item?.props}>
      {drawedChildren}
    </Comp>
  )
}

export default Preview
