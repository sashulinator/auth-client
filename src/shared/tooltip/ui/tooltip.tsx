import './tooltip.css'

import React, { ReactNode, memo } from 'react'
import { useTranslation } from 'react-i18next'

interface TooltipProps {
  children: ReactNode
  text: string
}

export default memo(function Tooltip(props: TooltipProps): JSX.Element {
  const { t } = useTranslation()

  return (
    <div className="Tooltip ">
      <div className="content">{props.children}</div>
      <span className="text left">{t(props.text).toString()}</span>
    </div>
  )
})
