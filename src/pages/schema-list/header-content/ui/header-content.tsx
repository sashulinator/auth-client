import { PrimaryButton } from '@fluentui/react'

import React from 'react'
import { useNavigate } from 'react-router-dom'

import ROUTES from '@/constants/routes'

export default function HeaderContent(): JSX.Element {
  const navigate = useNavigate()

  return (
    <PrimaryButton
      onClick={() => {
        navigate(ROUTES.FORM_CONSTRUCTOR.buildURL())
      }}
    >
      Create new
    </PrimaryButton>
  )
}
