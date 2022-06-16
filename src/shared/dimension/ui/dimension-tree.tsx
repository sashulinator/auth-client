import { isString } from '@savchenko91/schema-validator'

import { Dimension } from '../model/types'
import React, { memo } from 'react'

import { Catalog, Schema } from '@/shared/schema-drawer'

interface DimensionTreeProps {
  schemas: Catalog<Schema<Dimension>> | string | undefined
  value: string[] | string | undefined
}

export default memo(function DimensionTree(props: DimensionTreeProps): JSX.Element {
  const value = isString(props.value) ? undefined : props.value

  return <div className="DimensionTree">{value?.join()}</div>
})
