import './index.css'

import Preview from './preview'
import PropertyPanel from './property-panel'
import TreePanel from './tree-panel'
import React, { FC } from 'react'

const FormConstructor: FC = (): JSX.Element => {
  return (
    <div className="FormConstructor">
      <TreePanel />
      <Preview />
      <PropertyPanel />
    </div>
  )
}

export default FormConstructor
