import { Stack } from '@fluentui/react'

import React from 'react'

import {
  HEADER_PORTAL_CENTER_CLASSNAME,
  HEADER_PORTAL_LEFT_CLASSNAME,
  HEADER_PORTAL_RIGHT_CLASSNAME,
} from '@/widgets/header'

export default function FakeHeader(): JSX.Element {
  return (
    <div className="FakeHeader">
      <div className="text">header</div>
      <Stack
        horizontal
        className={HEADER_PORTAL_LEFT_CLASSNAME.replace('.', '')}
        horizontalAlign="start"
        verticalAlign="center"
        style={{ width: '100%' }}
      />
      <Stack
        horizontal
        className={HEADER_PORTAL_CENTER_CLASSNAME.replace('.', '')}
        horizontalAlign="start"
        verticalAlign="center"
        style={{ width: '100%' }}
      />
      <Stack
        horizontal
        className={HEADER_PORTAL_RIGHT_CLASSNAME.replace('.', '')}
        horizontalAlign="end"
        verticalAlign="center"
        style={{ width: 'fit-content' }}
      />
    </div>
  )
}
