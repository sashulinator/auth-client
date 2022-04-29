import './index.css'
import cx from 'clsx'
import React, { FC } from 'react'
import { useTranslation } from 'react-i18next'

import { ServerCollectableError } from '@/types/transfer'

type FieldErrorProps = {
  className?: string
  error?: ServerCollectableError
}

const FieldError: FC<FieldErrorProps> = ({ className, error }): JSX.Element => {
  const { t } = useTranslation()
  const formWithValueErrorMessage = useGetMessageWithCodeAndValue(error)
  const code = error?._code

  // sometimes you have 'matchPattern' as a code and you dont want to show pattern but readable message
  const formErrorMessage = formWithValueErrorMessage || t(code || '', error)

  return <div className={cx('FieldError', className)}>{formErrorMessage}</div>
}

function useGetMessageWithCodeAndValue(error?: ServerCollectableError): string | undefined {
  const { t } = useTranslation()
  const input2 = String(error?._input2)
  const code = String(error?._code)

  const res = t(`${code}${input2}`, error)

  if (res === `${code}${input2}`) {
    return undefined
  }

  return res
}

export default FieldError
