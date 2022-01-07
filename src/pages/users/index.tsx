import { FC, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { Panel } from '@fluentui/react/lib/Panel'
import { Stack, ActionButton, DetailsList, Selection } from '@fluentui/react'
import * as userSelectors from '@/redux/user.selector'
import * as userActions from '@/redux/user.actions'
import store from '@/app/redux-store'
import { User } from '@/types/entities'
import UserForm from './form'
import useBoolean from '@/utils/use-boolean'
import { useSelection } from '@/utils/use-selection'

const List: FC = (): JSX.Element => {
  const { t } = useTranslation()

  const userListState = useSelector(userSelectors.getList)

  const [isFormPanelOpen, openFormPanel, closeFormPanel] = useBoolean(false)

  const { selectedItems, selection } = useSelection<User>()

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
        onDismiss={closeFormPanel}
        closeButtonAriaLabel="Close"
      >
        <UserForm
          defaultValues={selectedItems[0]}
          closeFormPanel={closeFormPanel}
        />
      </Panel>
      <Stack tokens={{ padding: '20px 40px' }}>
        <h1>{t('pagesNames.userList')}</h1>
      </Stack>
      <Stack tokens={{ padding: '20px 40px' }}>
        <Stack horizontal>
          <ActionButton
            disabled={selectedItems.length > 0}
            onClick={openFormPanel}
          >
            {t('buttons.create')}
          </ActionButton>
          <ActionButton
            onClick={openFormPanel}
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
