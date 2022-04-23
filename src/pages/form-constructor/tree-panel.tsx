import React, { FC } from 'react'
import { useRecoilState } from 'recoil'

import { selectedSchemaItemIdState } from '@/recoil/form-schema'

const TreePanel: FC = (): JSX.Element => {
  const [, setSelectedComponentId] = useRecoilState(selectedSchemaItemIdState)

  function selectComponent() {
    setSelectedComponentId('ee4254ef-9099-4243-be68-51ce733b338e')
  }

  return (
    <div className="TreePanel">
      <button onClick={selectComponent}>select button</button>
    </div>
  )
}

export default TreePanel
