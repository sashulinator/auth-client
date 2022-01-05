import { FC, useEffect } from 'react'
import cx from 'clsx'
import { DetailsList, SelectionMode } from '@fluentui/react/lib/DetailsList'
import { Stack } from '@fluentui/react/lib/Stack'
import { useSelector } from 'react-redux'
import * as userSelector from '../../../redux/user.selector'
import * as userActions from '../../../redux/user.actions'
import store from '../../../app/redux-store'

type UsersProps = {
  className?: string
}

const List: FC<UsersProps> = ({ className }): JSX.Element => {
  const usersListState = useSelector(userSelector.getList)

  useEffect(getUsers, [])

  function getUsers() {
    store.dispatch(userActions.getList())
  }

  return (
    <div className={cx('Users', className)}>
      <Stack tokens={{ padding: '20px 40px' }}>
        <h1>Users</h1>
      </Stack>
      <Stack tokens={{ padding: '20px 40px' }}>
        <DetailsList
          items={usersListState.data.items}
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
