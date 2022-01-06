import { FC, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { Panel } from '@fluentui/react/lib/Panel'
import {
  Stack,
  ActionButton,
  DetailsList,
  Selection,
  SelectionMode,
} from '@fluentui/react'
import * as userSelectors from '@/redux/user.selector'
import * as userActions from '@/redux/user.actions'
import store from '@/app/redux-store'
import { User } from '@/types/entities'
import UserForm from './form'

const List: FC = (): JSX.Element => {
  const { t } = useTranslation()

  const userListState = useSelector(userSelectors.getList)

  const [selectedItems, setSelectedItems] = useState<User[]>([])
  const [isFormPanelOpen, setIsFormPanelOpen] = useState(false)

  const selection = new Selection<User>({
    selectionMode: SelectionMode.multiple,
    getKey: (user) => user.id.toString(),
    onSelectionChanged: () => {
      setSelectedItems(selection.getSelection())
    },
  })

  useEffect(getUsers, [])

  function getUsers() {
    store.dispatch(userActions.getList())
  }

  function pruneMany() {
    const ids = selectedItems.map((user) => user.id)
    store.dispatch(userActions.pruneMany(ids, { onSuccess: getUsers }))
  }

  return (
    <div className="Users">
      <Panel
        isLightDismiss
        headerText="Sample panel"
        isOpen={isFormPanelOpen}
        onDismiss={() => setIsFormPanelOpen(false)}
        closeButtonAriaLabel="Close"
      >
        <UserForm
          defaultValues={selectedItems[0]}
          onClose={() => setIsFormPanelOpen(false)}
        />
      </Panel>
      <Stack tokens={{ padding: '20px 40px' }}>
        <h1>{t('pagesNames.userList')}</h1>
      </Stack>
      <Stack tokens={{ padding: '20px 40px' }}>
        <Stack horizontal>
          <ActionButton
            disabled={selectedItems.length > 0}
            onClick={() => setIsFormPanelOpen(true)}
          >
            {t('buttons.create')}
          </ActionButton>
          <ActionButton
            onClick={() => setIsFormPanelOpen(true)}
            disabled={selectedItems.length !== 1}
          >
            {t('buttons.edit')}
          </ActionButton>
          <ActionButton
            onClick={pruneMany}
            disabled={selectedItems.length <= 0}
          >
            {t('buttons.remove')}
          </ActionButton>
        </Stack>
        <DetailsList
          selection={selection as Selection}
          items={userListState.data.items}
          columns={[
            {
              key: 'name',
              name: t('entities.user.name'),
              minWidth: 100,
              fieldName: 'name',
            },
            {
              key: 'email',
              name: t('entities.user.email'),
              minWidth: 100,
              fieldName: 'email',
            },
            {
              key: 'createdAt',
              name: t('entities.user.createdAt'),
              minWidth: 100,
              fieldName: 'createdAt',
              onRender: (user: User) => user.createdAt.slice(0, 10),
            },
            {
              key: 'updatedAt',
              name: t('entities.user.updatedAt'),
              minWidth: 100,
              fieldName: 'updatedAt',
              onRender: (user: User) => user.updatedAt.slice(0, 10),
            },
          ]}
          selectionPreservedOnEmptyClick
          setKey="set"
          ariaLabelForSelectionColumn="Toggle selection"
          ariaLabelForSelectAllCheckbox="Toggle selection for all items"
          checkButtonAriaLabel="select row"
        />
      </Stack>
    </div>
  )
}

export default List
