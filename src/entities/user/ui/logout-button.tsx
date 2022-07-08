import React from 'react'

import useLogout from '@/entities/user/lib/use-logout'
import { Button } from '@/shared/button'

export default function LogoutButton(): JSX.Element {
  const logout = useLogout()

  return <Button onClick={logout} text="t.buttons.logout" />
}
