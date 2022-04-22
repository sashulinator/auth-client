import './index.css'
import Preview from './preview'
import TreePanel from './tree-panel'
import React, { FC } from 'react'

const FormConstructor: FC = (): JSX.Element => {
  return (
    <div className="FormConstructor">
      <TreePanel />
      <Preview />
    </div>
  )
}

export default FormConstructor
