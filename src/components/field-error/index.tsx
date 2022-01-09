import { FC } from 'react'
import cx from 'clsx'
import './index.css'
import { ServerCollectableError } from '@/types/transfer'
import { useTranslation } from 'react-i18next'

type FieldErrorProps = {
  className?: string
  error?: ServerCollectableError
}

const FieldError: FC<FieldErrorProps> = ({ className, error }): JSX.Element => {
  const { t } = useTranslation()

  const formErrorMessage = t(error?.errorCode || '', error)

  return <div className={cx('FieldError', className)}>{formErrorMessage}</div>
}

export default FieldError
