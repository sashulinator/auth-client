import './index.css'
import TreePanel from './tree-panel'
import React, { FC } from 'react'

const FormConstructor: FC = (): JSX.Element => {
  return (
    <div className="FormConstructor">
      <TreePanel />
      FormConstructor
    </div>
  )
}

export default FormConstructor
