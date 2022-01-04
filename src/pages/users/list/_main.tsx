import { FC, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import cx from 'clsx'
import ROUTES from '../../../constants/routes'
import { DetailsList, SelectionMode } from '@fluentui/react/lib/DetailsList'
import { Stack } from '@fluentui/react/lib/Stack'
type UsersProps = {
  className?: string
}

const List: FC<UsersProps> = ({ className }): JSX.Element => {
  const [usersData, setUsers] = useState({ items: [], total: 0 })

  useEffect(getUsers, [])

  function getUsers() {
    ;(async function () {
      console.log('am i here&')

      const res = await fetch('/api/v1/users')
      const data = await res.json()
      console.log('data', data)

      setUsers(data)
    })()
  }
  return (
    <div className={cx('Users', className)}>
      <h1>Users</h1>
      <nav>
        <Link to={ROUTES.LOGIN.buildURL()}>Login</Link>
      </nav>
      <Stack tokens={{ padding: '20px 40px' }}>
        <DetailsList
          items={usersData.items}
          columns={[
            {
              key: 'name',
              name: 'name',
              minWidth: 300,
              fieldName: 'name',
            },
            {
              key: 'email',
              name: 'email',
              minWidth: 300,
              fieldName: 'email',
            },
          ]}
          selectionMode={SelectionMode.none}
          ariaLabelForSelectionColumn="Toggle selection"
          ariaLabelForSelectAllCheckbox="Toggle selection for all items"
          checkButtonAriaLabel="select row"
        />
      </Stack>
    </div>
  )
}

export default List
