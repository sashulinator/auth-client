import { Stack } from '@fluentui/react'

import React, { FC } from 'react'
import { useRecoilState } from 'recoil'

import { formSchemaState, selectedSchemaItemIdState } from '@/recoil/form-schema'

const TreePanel: FC = (): JSX.Element => {
  const [, setSelectedComponentId] = useRecoilState(selectedSchemaItemIdState)
  const [formSchema] = useRecoilState(formSchemaState)

  function selectComponent(key: string) {
    return () => setSelectedComponentId(key)
  }

  return (
    <div className="TreePanel">
      <Stack>
        {Object.entries(formSchema).map(([key, schemaItem]) => {
          return (
            <button key={key} onClick={selectComponent(key)}>
              {schemaItem.name}
            </button>
          )
        })}
      </Stack>
    </div>
  )
}

export default TreePanel
