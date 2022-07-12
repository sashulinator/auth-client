import React from 'react'
import { useQuery } from 'react-query'

import api from '@/api/api-axios'

interface GetUserProps {
  children: React.ReactNode
}

export default function GetUser(props: GetUserProps): JSX.Element {
  useQuery(['refresh'], () => api.post('/api/auth/refresh'))

  return <>{props.children}</>
}
