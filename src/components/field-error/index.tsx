import './index.css'

import cx from 'clsx'
import React, { useRef } from 'react'
import { useTranslation } from 'react-i18next'

import { ServerCollectableError } from '@/types/transfer'

type FieldErrorProps = {
  className?: string
  error?: ServerCollectableError
}

export default function FieldError(props: FieldErrorProps): JSX.Element {
  const elementRef = useRef<null | HTMLDivElement>(null)
  const { t } = useTranslation()

  const code = props?.error?._code ?? ''
  const input2 = props?.error?._input2 ? String(props?.error?._input2) : ''

  const codeMessage = t(`${code}${input2}`, props?.error?._message)

  // Делаем так потому что некоторые строки содержат в себе HTML теги
  // которые обычным способом вставились бы просто как текст
  if (elementRef.current?.innerHTML !== undefined) {
    elementRef.current.innerHTML = codeMessage
  }

  return <div ref={elementRef} className={cx('FieldError', props.className)} />
}
