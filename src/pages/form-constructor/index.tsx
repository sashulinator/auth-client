import './index.css'

import ComponentPropsPanel from './form-item-props-panel'
import Preview from './preview'
import TreePanel from './tree-panel'
import React, { FC } from 'react'

const FormConstructor: FC = (): JSX.Element => {
  return (
    <div className="FormConstructor">
      <TreePanel />
      <Preview />
      <ComponentPropsPanel />
    </div>
  )
}

export default FormConstructor
