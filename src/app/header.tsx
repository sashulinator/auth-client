import { FC } from 'react'
import cx from 'clsx'
import './header.css'

type HeaderProps = {
  className?: string
}

const Header: FC<HeaderProps> = ({ className }): JSX.Element => {
  return <header className={cx('Header', className)}>Header</header>
}

export default Header
