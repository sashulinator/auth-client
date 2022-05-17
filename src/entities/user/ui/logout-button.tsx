import { PrimaryButton } from '@fluentui/react'

import React from 'react'
import { useTranslation } from 'react-i18next'

import useLogout from '@/entities/user/lib/use-logout'

export default function LogoutButton(): JSX.Element {
  const { t } = useTranslation()
  const logout = useLogout()

  return <PrimaryButton onClick={logout}>{t('buttons.logout').toString()}</PrimaryButton>
}
