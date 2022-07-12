import { Spinner, SpinnerSize } from '@fluentui/react'

import './loading-area.css'

import cx from 'clsx'
import React, { FC } from 'react'

type LoadingAreaProps = {
  loading?: boolean
  top?: string
  children?: React.ReactNode
  label?: string
}

const LoadingArea: FC<LoadingAreaProps> = ({ loading, label, children, top = '77px' }): JSX.Element => {
  if (!loading) {
    return <>{children}</>
  }

  return (
    <div className={cx('LoadingAria', loading && 'LoadingAria--loading')}>
      <div className="spinnerContainer" style={{ top }}>
        <Spinner size={SpinnerSize.large} label={label} />
      </div>
      <div className="contentContainer">{children}</div>
    </div>
  )
}

export default LoadingArea
