import { FC, useEffect } from 'react'
import { DetailsList, SelectionMode } from '@fluentui/react/lib/DetailsList'
import { Stack } from '@fluentui/react/lib/Stack'
import { useSelector } from 'react-redux'
import * as userSelectors from '@/redux/user.selector'
import * as userActions from '@/redux/user.actions'
import store from '@/app/redux-store'

const List: FC = (): JSX.Element => {
  const userListState = useSelector(userSelectors.getList)

  useEffect(getUsers, [])

  function getUsers() {
    store.dispatch(userActions.getList())
  }

  return (
    <div className="Users">
      <Stack tokens={{ padding: '20px 40px' }}>
        <h1>Users</h1>
      </Stack>
      <Stack tokens={{ padding: '20px 40px' }}>
        <DetailsList
          items={userListState.data.items}
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
