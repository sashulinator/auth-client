import './index.css'

import ComponentPanel from './component-panel'
import Preview from './preview'
import TreePanel from './tree-panel'
import React, { FC } from 'react'

const FormConstructor: FC = (): JSX.Element => {
  return (
    <div className="FormConstructor">
      <TreePanel />
      <Preview />
      <ComponentPanel />
    </div>
  )
}

export default FormConstructor
