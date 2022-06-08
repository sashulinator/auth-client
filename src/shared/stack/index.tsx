import { IStackProps, Stack as StackUI } from '@fluentui/react'

import React from 'react'

interface StackProps extends IStackProps {
  visible: boolean
}

export default function Stack(props: StackProps): JSX.Element | null {
  return props.visible ? <StackUI {...props} /> : null
}

Stack.defaultProps = {
  visible: true,
}
