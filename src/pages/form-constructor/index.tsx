import './index.css'

import CompPanel from './comp-panel'
import Preview from './preview'
import TreePanel from './tree-panel/ui/tree-panel'
import React, { FC } from 'react'

const FormConstructor: FC = (): JSX.Element => {
  return (
    <div className="FormConstructor">
      <TreePanel />
      <Preview />
      <CompPanel />
    </div>
  )
}

export default FormConstructor
