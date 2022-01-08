import { FC } from 'react'
import cx from 'clsx'
import './index.css'
import { ValidationError } from '@/types/transfer'
import { useTranslation } from 'react-i18next'

type FieldErrorProps = {
  className?: string
  name: string
  formErrors?: Partial<Record<string, { message?: string }>>
  serverErrors?: {
    validationErrors?: Record<string, ValidationError> | null
  }
}

const FieldError: FC<FieldErrorProps> = ({
  className,
  name,
  serverErrors: stateWithServerErrors,
  formErrors,
}): JSX.Element => {
  const { t } = useTranslation()

  const formErrorMessage = t(formErrors?.[name]?.message || '')

  const validationError = stateWithServerErrors?.validationErrors?.[name]

  const serverErrorMessage = t(
    validationError?.errorCode || '',
    validationError
  )

  return (
    <div className={cx('FieldError', className)}>
      {formErrorMessage || serverErrorMessage}
    </div>
  )
}

export default FieldError
