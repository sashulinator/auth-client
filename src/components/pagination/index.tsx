import { isNumber } from '@/utils/is-number'
import React, { FC, useMemo } from 'react'
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
    onKeyUp: (e: React.KeyboardEvent) => void
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
  buttonComponent,
  inputComponent,
  totalItems,
  perPage,
  currentPage,
}): JSX.Element => {
  const parsedTotalItems = parseNumber(totalItems)
  const parsedPerPage = parseNumber(perPage)

  const Input = useMemo(() => inputComponent, [inputComponent])
  const Button = useMemo(() => buttonComponent, [buttonComponent])

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
        ariaLabel="test"
        aria-label="test"
      >
        {'<<'}
      </Button>
      <Button
        disabled={parsedCurrentPage === 1}
        onClick={handleChange(parsedCurrentPage - 1)}
        ariaLabel="test"
        aria-label="test"
      >
        {'<'}
      </Button>
      <Input
        aria-label="current page"
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
        ariaLabel="test"
        aria-label="test"
      >
        {'>'}
      </Button>
      <Button
        disabled={parsedCurrentPage >= totalPages}
        onClick={handleChange(totalPages)}
        ariaLabel="test"
        aria-label="test"
      >
        {'>>'}
      </Button>
    </div>
  )
}

export default Pagination
