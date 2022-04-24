import { ActionButton, Stack } from '@fluentui/react'

import React, { FC } from 'react'
import { useRecoilState } from 'recoil'

import { formSchemaState, selectedSchemaItemIdState } from '@/recoil/form-schema'

const buttonStyles = {
  root: { color: 'var(--themeDark)' },
  rootDisabled: { color: 'var(--themeTertiary)' },
}

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
            <ActionButton styles={buttonStyles} key={key} onClick={selectComponent(key)}>
              {schemaItem.name}
            </ActionButton>
          )
        })}
      </Stack>
    </div>
  )
}

export default TreePanel
