import './field-error.css'

import cx from 'clsx'
import React, { useRef } from 'react'
import { FieldMetaState } from 'react-final-form'
import { useTranslation } from 'react-i18next'

import { ServerCollectableError } from '@/types/transfer'

type FieldErrorProps = {
  className?: string
  meta?: FieldMetaState<unknown>
  onTouched?: boolean
  onInit?: boolean
  onSubmit?: boolean
  onVisited?: boolean
}

export default function FieldError(props: FieldErrorProps): JSX.Element | null {
  const elementRef = useRef<null | HTMLDivElement>(null)
  const { t } = useTranslation()

  const error = (props?.meta?.error || props?.meta?.submitError) as ServerCollectableError

  const isTouched = props.onTouched && props.meta?.touched
  const isSubmit = props.onSubmit && props.meta?.submitting
  const isVisited = props.onVisited && props.meta?.visited

  const code = error?._code ?? ''
  const input2 = error?._input2 ? String(error?._input2) : ''

  const tkey = `${code}${input2?.toString()}`

  const simpleMessage = t(code, error?._message, error)
  const complexMessage = t(`${code}${input2?.toString()}`, error)

  // Делаем так потому что некоторые строки содержат в себе HTML теги
  // которые обычным способом вставились бы просто как текст
  if (elementRef.current?.innerHTML !== undefined) {
    elementRef.current.innerHTML = complexMessage === tkey ? simpleMessage : complexMessage
  }

  if (props.onInit || isTouched || isSubmit || isVisited) {
    return <div ref={elementRef} className={cx('FieldError', props.className)} />
  }

  return null
}

FieldError.defaultProps = {
  onTouched: true,
}
