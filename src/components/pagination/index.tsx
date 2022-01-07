import { isNumber } from '@/utils/is-number'
import React, { FC } from 'react'
import './index.css'

type PaginationProps = {
  className?: string
  buttonComponent: React.ComponentType<{
    ariaLabel?: string
    'aria-label'?: string
    onClick?: () => void
    disabled: boolean
  }>
  inputComponent: React.ComponentType<{
    ariaLabel?: string
    'aria-label'?: string
    value: string
  }>
  totalItems?: number | string
  perPage?: number | string
  currentPage?: number | string
  onChange?: (num: number) => void
  currentText?: string
}

const Pagination: FC<PaginationProps> = ({
  className = '',
  onChange,
  buttonComponent: Botton,
  inputComponent: Input,
  totalItems,
  perPage,
  currentPage,
}): JSX.Element => {
  const parsedTotalItems = parseNumber(totalItems)
  const parsedPerPage = parseNumber(perPage)

  const totalPages = Math.ceil(parsedTotalItems / parsedPerPage)

  const parsedCurrentPage = parseNumber(currentPage)

  function parseNumber(num: string | number = '', defaultNumber = 0): number {
    if (isNumber(num)) {
      return num ?? defaultNumber
    }

    return parseInt(num, 10) || defaultNumber
  }

  function handleChange(newPage: number) {
    return () => {
      if (newPage !== currentPage && onChange) {
        onChange?.(newPage)
      }
    }
  }

  return (
    <div className={`Pagination ${className}`}>
      <Botton
        disabled={parsedCurrentPage === 1}
        onClick={handleChange(1)}
        ariaLabel="test"
        aria-label="test"
      >
        {'<<'}
      </Botton>
      <Botton
        disabled={parsedCurrentPage === 1}
        onClick={handleChange(parsedCurrentPage - 1)}
        ariaLabel="test"
        aria-label="test"
      >
        {'<'}
      </Botton>
      <Input aria-label="current page" value={parsedCurrentPage.toString()} />
      <Botton
        disabled={parsedCurrentPage >= totalPages}
        onClick={handleChange(parsedCurrentPage + 1)}
        ariaLabel="test"
        aria-label="test"
      >
        {'>'}
      </Botton>
      <Botton
        disabled={parsedCurrentPage >= totalPages}
        onClick={handleChange(totalPages)}
        ariaLabel="test"
        aria-label="test"
      >
        {'>>'}
      </Botton>
    </div>
  )
}

export default Pagination
