import React from 'react'
import { useQuery } from 'react-query'

import authApi from '@/api/api-axios'

interface GetUserProps {
  children: React.ReactNode
}

export default function GetUser(props: GetUserProps): JSX.Element {
  useQuery(['refresh'], () => authApi.post('/api/auth/refresh'))

  return <>{props.children}</>
}
