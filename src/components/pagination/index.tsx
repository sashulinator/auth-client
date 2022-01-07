import { isNumber } from '@/utils/is-number'
import React, { FC } from 'react'
import './index.css'

export interface PaginationInputProps {
  ariaLabel?: string
  value: string
  onKeyUp: (e: React.KeyboardEvent) => void
}
export interface PaginationButtonProps {
  onClick?: () => void
  disabled: boolean
  ariaLabel: string
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
      if (
        newPage !== currentPage &&
        onChange &&
        newPage >= 1 &&
        newPage <= totalPages
      ) {
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
        ariaLabel={
          currentPageAriaLabel ||
          'Current page. Press the Enter button to apply'
        }
        onKeyUp={(e) => {
          if (e.key === 'Enter' || e.keyCode === 13) {
            handleChange(((e.target as unknown) as { value: number }).value)()
          }
        }}
        value={parsedCurrentPage.toString()}
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
