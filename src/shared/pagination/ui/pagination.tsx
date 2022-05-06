import { isNumber } from '@savchenko91/schema-validator'

import './pagination.css'

import { useInputValue } from '../lib/use-input-value'
import React, { FC } from 'react'

export interface PaginationInputProps {
  ariaLabel?: string
  value: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onKeyUp: (e: { target: any; key: string }) => void
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onChange: (e: { target: any }) => void
}
export interface PaginationButtonProps {
  onClick?: () => void
  disabled: boolean
  ariaLabel: string
  children: React.ReactNode
}

export type PaginationProps = {
  currentPageAriaLabel?: string
  previousPageAriaLabel?: string
  lastPagePageAriaLabel?: string
  firstPageAriaLabel?: string
  nextPageAriaLabel?: string
  className?: string
  buttonComponent: React.ComponentType<PaginationButtonProps>
  inputComponent: React.ComponentType<PaginationInputProps>
  totalItems?: number | string
  perPage?: number | string
  currentPage?: number | string
  onChange?: (num: number) => void
  currentText?: string
}

function parseNumber(num: string | number = '', defaultNumber = 0): number {
  if (isNumber(num)) {
    return num ?? defaultNumber
  }

  return parseInt(num, 10) || defaultNumber
}

const Pagination: FC<PaginationProps> = ({
  className = '',
  onChange,
  buttonComponent: Button,
  inputComponent: Input,
  totalItems,
  currentPageAriaLabel,
  previousPageAriaLabel,
  lastPagePageAriaLabel,
  nextPageAriaLabel,
  firstPageAriaLabel,
  perPage,
  currentPage,
}): JSX.Element => {
  const [inputValue, onInputChange, onInputKeyUp] = useInputValue(currentPage?.toString(), handleChange)
  const parsedTotalItems = parseNumber(totalItems)
  const parsedPerPage = parseNumber(perPage)

  const totalPages = Math.ceil(parsedTotalItems / parsedPerPage)

  const parsedCurrentPage = parseNumber(currentPage)

  function handleChange(newPage: number) {
    return () => {
      if (newPage !== currentPage && onChange && newPage >= 1 && newPage <= totalPages) {
        onChange?.(newPage)
      }
    }
  }

  return (
    <div className={`Pagination ${className}`}>
      <Button
        disabled={parsedCurrentPage === 1}
        onClick={handleChange(1)}
        ariaLabel={firstPageAriaLabel || 'Go to the first page'}
      >
        {'<<'}
      </Button>
      <Button
        disabled={parsedCurrentPage === 1}
        onClick={handleChange(parsedCurrentPage - 1)}
        ariaLabel={previousPageAriaLabel || 'Go to the previous page'}
      >
        {'<'}
      </Button>
      <Input
        ariaLabel={currentPageAriaLabel || 'Current page. Press the Enter button to apply'}
        onKeyUp={onInputKeyUp}
        onChange={onInputChange}
        value={inputValue}
      />
      <Button
        disabled={parsedCurrentPage >= totalPages}
        onClick={handleChange(parsedCurrentPage + 1)}
        ariaLabel={nextPageAriaLabel || 'Go to the next page'}
      >
        {'>'}
      </Button>
      <Button
        disabled={parsedCurrentPage >= totalPages}
        onClick={handleChange(totalPages)}
        ariaLabel={lastPagePageAriaLabel || 'Go to the last page'}
      >
        {'>>'}
      </Button>
    </div>
  )
}

export default Pagination
