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

  const formErrorMessage = t(error?._code || '', error)

  return <div className={cx('FieldError', className)}>{formErrorMessage}</div>
}

export default FieldError
