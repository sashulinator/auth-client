import './index.css'

import CompPanel from './comp-panel'
import PaletteModal from './palette-modal'
import Preview from './preview'
import TreePanel from './tree-panel'
import React, { FC } from 'react'

const FormConstructor: FC = (): JSX.Element => {
  return (
    <div className="FormConstructor">
      <TreePanel />
      <Preview />
      <CompPanel />
      <PaletteModal />
    </div>
  )
}

export default FormConstructor
