import { Checkbox, Label, Stack } from '@fluentui/react'

import React, { useState } from 'react'

import { generateOptionsFromUnknown } from '@/lib/generate-options'

interface MultiCheckboxProps {
  label: string
  childrenGap: number
  options: unknown
  value: string[]
  onChange: (value: string[]) => void
}

export default function MultiCheckbox(props: MultiCheckboxProps): JSX.Element {
  const [value, setValue] = useState<string[]>(props.value || [])
  const options = generateOptionsFromUnknown(props.options)

  function onChange(optionKey: string) {
    const clonedValue = [...value]
    const index = clonedValue.indexOf(optionKey)

    if (index > -1) {
      clonedValue.splice(index, 1)
    } else {
      clonedValue.push(optionKey)
    }

    setValue(clonedValue)
    props.onChange(clonedValue)
  }

  function groupedCheckboxes(): JSX.Element {
    return (
      <Stack>
        {props.label && <Label>{props.label}</Label>}
        <Stack tokens={{ childrenGap: props.childrenGap }}>
          {options.map((option) => (
            <Checkbox key={option.key} label={option.text} onChange={() => onChange(option.key.toString() || '')} />
          ))}
        </Stack>
      </Stack>
    )
  }

  return <>{groupedCheckboxes()}</>
}
