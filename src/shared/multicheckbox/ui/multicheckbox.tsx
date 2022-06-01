import { Checkbox, Label } from '@fluentui/react'

import React, { useState } from 'react'

import normalizeOptions from '@/lib/normalize-options'

export default function MultiCheckbox(props: any): JSX.Element {
  const [value, setValue] = useState<string[]>(props.value || [])
  const options = normalizeOptions(props.options)

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
      <div>
        <Label>{props.label}</Label>
        {options.map((option) => (
          <Checkbox
            styles={{ root: { margin: 3 } }}
            key={option.key}
            label={option.text}
            onChange={() => onChange(option.key.toString() || '')}
          ></Checkbox>
        ))}
      </div>
    )
  }

  return <>{groupedCheckboxes()}</>
}
