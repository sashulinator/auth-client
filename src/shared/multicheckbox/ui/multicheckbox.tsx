import { Checkbox } from '@fluentui/react'

import React, { useState } from 'react'

export default function MultiCheckbox(): JSX.Element {
  const [state, setState] = useState<{ picked: string[] }>({ picked: [] })
  const options = [
    ['RT1', 'операционный риск'],
    ['RT2', 'репутационный риск'],
    ['RT3', 'рыночный риск'],
  ]

  function onChange(optionKey: string) {
    const picked = state.picked
    const index = picked.indexOf(optionKey)

    if (index > -1) {
      picked.splice(index, 1)
    } else {
      picked.push(optionKey)
    }

    setState({
      picked: picked,
    })
  }

  function groupedCheckboxes(): JSX.Element {
    return (
      <div>
        {options.map((option) => (
          <Checkbox
            styles={{ root: { margin: 3 } }}
            key={option[0]}
            label={option[1]}
            onChange={() => onChange(option[0] || '')}
          ></Checkbox>
        ))}
      </div>
    )
  }

  return (
    <>
      <div>{groupedCheckboxes()}</div>
      <div>{state.picked.toString()}</div>
    </>
  )
}
