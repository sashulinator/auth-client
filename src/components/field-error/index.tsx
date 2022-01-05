import { FC } from 'react'
import cx from 'clsx'
import './index.css'

type FieldErrorProps = {
  className?: string
  message?: string
}

const FieldError: FC<FieldErrorProps> = ({
  className,
  message,
}): JSX.Element => {
  return <div className={cx('FieldError', className)}>{message}</div>
}

export default FieldError
