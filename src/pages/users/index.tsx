import { ActionButton, DetailsList, SearchBox, Selection, Stack, TextField } from '@fluentui/react'
import { Panel } from '@fluentui/react/lib/Panel'

import UserForm from './form'
import React, { FC, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'

import store from '@/app/redux-store'
import LoadingAria from '@/components/loading-aria'
import Pagination, { PaginationButtonProps, PaginationInputProps } from '@/components/pagination'
import * as userActions from '@/redux/user.actions'
import * as userSelectors from '@/redux/user.selector'
import { User } from '@/types/entities'
import useBoolean from '@/utils/use-boolean'
import { useDebounce } from '@/utils/use-debaunce'
import { useSelection } from '@/utils/use-selection'

const PER_PAGE = 10

const buttonStyles = {
  root: { color: 'var(--themeDark)' },
  rootDisabled: { color: 'var(--themeTertiary)' },
}

const PaginationButton: FC<PaginationButtonProps> = (props) => {
  return <ActionButton {...props} styles={buttonStyles} />
}

const PaginationInput: FC<PaginationInputProps> = (props) => {
  return (
    <TextField
      value={props.value}
      onChange={props.onChange}
      onKeyUp={props.onKeyUp}
      styles={{
        root: { maxWidth: 35 },
        field: { textAlign: 'center' },
      }}
      ariaLabel={props.ariaLabel}
    />
  )
}

const List: FC = (): JSX.Element => {
  const { t } = useTranslation()

  const userListState = useSelector(userSelectors.getList)

  const [searchQuery, setSearchQueryWithDelay, setSearchQuery] = useDebounce<undefined | string>(undefined, 500)

  const [isFormPanelOpen, openFormPanel, closeFormPanel] = useBoolean(false)
  const [isFilterVisible, showFilter, hideFilter] = useBoolean(false)

  const { selectedItems: selectedUsers, selection } = useSelection<User & { password: string }>()

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => getUserList(1), [searchQuery])

  function getUserList(page?: number) {
    userListState?.abortController?.abort()
    const currentPage = page || userListState.currentPage
    setTimeout(() => store.dispatch(userActions.getList({ currentPage, perPage: PER_PAGE, searchQuery })))
  }

  function pruneMany() {
    const ids = selectedUsers.map((user) => user.id)
    store.dispatch(userActions.pruneMany(ids, { onSuccess: () => getUserList() }))
  }

  function onFormSuccess() {
    getUserList(1)
  }

  function closeFilter() {
    setSearchQuery(undefined)
    hideFilter()
  }

  const userForm = (
    <UserForm onSucces={onFormSuccess} initialValues={selectedUsers[0]} closeFormPanel={closeFormPanel} />
  )

  return (
    <div className="Users">
      <Panel
        isLightDismiss
        headerText={selectedUsers[0] ? t('userPage.editUser') : t('userPage.createUser')}
        isOpen={isFormPanelOpen}
        onDismiss={closeFormPanel}
        closeButtonAriaLabel="Close"
      >
        {userForm}
      </Panel>
      <Stack tokens={{ padding: '20px 40px' }}>
        <h1>{t('pagesNames.userList')}</h1>
      </Stack>
      <Stack tokens={{ padding: '20px 40px' }}>
        <Stack horizontal horizontalAlign="space-between">
          <Stack horizontal>
            {isFilterVisible ? (
              <>
                <SearchBox
                  autoFocus
                  ariaLabel={t('userPage.searchByNameEmail')}
                  onChange={(e) => setSearchQueryWithDelay(e?.target.value)}
                  showIcon={false}
                  placeholder={t('userPage.searchByNameEmail')}
                  underlined={true}
                  styles={{ root: { width: '300px' } }}
                />
                <ActionButton onClick={closeFilter} styles={buttonStyles} ariaLabel={t('buttons.close')}>
                  {t('buttons.close')}
                </ActionButton>
              </>
            ) : (
              <>
                <ActionButton
                  disabled={selectedUsers.length > 0}
                  onClick={openFormPanel}
                  styles={buttonStyles}
                  ariaLabel={t('buttons.create')}
                >
                  {t('buttons.create')}
                </ActionButton>
                <ActionButton
                  onClick={openFormPanel}
                  disabled={selectedUsers.length !== 1}
                  styles={buttonStyles}
                  ariaLabel={t('buttons.edit')}
                >
                  {t('buttons.edit')}
                </ActionButton>
                <ActionButton
                  onClick={pruneMany}
                  disabled={selectedUsers.length <= 0}
                  styles={buttonStyles}
                  ariaLabel={t('buttons.remove')}
                >
                  {t('buttons.remove')}
                </ActionButton>
                <ActionButton onClick={showFilter} styles={buttonStyles} ariaLabel={t('buttons.filter')}>
                  {t('buttons.filter')}
                </ActionButton>
              </>
            )}
          </Stack>
          <Stack
            style={{ color: 'var(--neutralTertiaryAlt)' }}
            horizontal
            tokens={{ childrenGap: 20 }}
            verticalAlign="center"
          >
            <div>
              {t('userPage.users')}: {userListState.data.total}
            </div>
            <div>
              {t('userPage.pages')}: {Math.ceil(userListState.data.total / PER_PAGE)}
            </div>
            <Pagination
              currentPageAriaLabel={t('pagination.currentPage')}
              previousPageAriaLabel={t('pagination.previousPage')}
              lastPagePageAriaLabel={t('pagination.lastPage')}
              firstPageAriaLabel={t('pagination.firstPage')}
              nextPageAriaLabel={t('pagination.nextPage')}
              onChange={getUserList}
              currentPage={userListState.currentPage}
              totalItems={userListState.data.total}
              perPage={PER_PAGE}
              inputComponent={PaginationInput}
              buttonComponent={PaginationButton}
            />
          </Stack>
        </Stack>
        <LoadingAria loading={userListState.loading}>
          <DetailsList
            selection={selection as Selection}
            items={userListState.data.items}
            columns={[
              {
                key: 'username',
                name: t('entities.user.username'),
                minWidth: 100,
                fieldName: 'username',
              },
              {
                key: 'fullname',
                name: t('entities.user.fullname'),
                minWidth: 100,
                fieldName: 'fullname',
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
            ariaLabelForSelectionColumn={t('buttons.toggleSelection')}
            ariaLabelForSelectAllCheckbox={t('buttons.toggleSelectionForAll')}
            checkButtonAriaLabel="select row"
          />
        </LoadingAria>
      </Stack>
    </div>
  )
}

export default List
