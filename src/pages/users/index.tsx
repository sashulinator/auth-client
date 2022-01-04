import { FC } from 'react'
import { Link } from 'react-router-dom'
import cx from 'clsx'
import ROUTES from '../../constants/routes'
import { DetailsList, SelectionMode } from '@fluentui/react/lib/DetailsList'
type UsersProps = {
  className?: string
}

const Users: FC<UsersProps> = ({ className }): JSX.Element => {
  return (
    <div className={cx('Users', className)}>
      <h1>Users</h1>
      <nav>
        <Link to={ROUTES.LOGIN.buildURL()}>Login</Link>
      </nav>
      <DetailsList
        items={[{ first: 'one', second: 'two' }]}
        columns={[
          {
            key: 'keyfirst',
            name: 'firstname',
            minWidth: 100,
            fieldName: 'first',
          },
        ]}
        selectionMode={SelectionMode.none}
        ariaLabelForSelectionColumn="Toggle selection"
        ariaLabelForSelectAllCheckbox="Toggle selection for all items"
        checkButtonAriaLabel="select row"
      />
    </div>
  )
}

export default Users
