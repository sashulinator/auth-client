import { isString } from '@savchenko91/schema-validator'

import './dimension.css'

import { Dimension } from '../model/types'
import React, { memo } from 'react'

import { Catalog, Schema } from '@/shared/schema-drawer'

interface DimensionProps {
  schemas: Catalog<Schema<Dimension>> | string | undefined
  value: string[] | string | undefined
}

export default memo(function Dimension(props: DimensionProps): JSX.Element {
  const value = isString(props.value) ? undefined : props.value

  return <div className="Dimension">{value?.join()}</div>
})
