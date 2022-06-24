import { PrimaryButton, Stack, Text } from '@fluentui/react'

import './index.css'

import React from 'react'
import { Field, Form } from 'react-final-form'
import { useNavigate } from 'react-router-dom'

import ROUTES from '@/constants/routes'
import CustomTextField from '@/shared/textfield'

export default function Login(): JSX.Element {
  const navigate = useNavigate()
  function onSubmit() {
    localStorage.setItem('access_token', 'access_token')
    localStorage.setItem('refresh_token', 'refresh_token')
    navigate(ROUTES.INCIDENT_LIST.PATH)
  }

  return (
    <Stack className="Login">
      <Form
        onSubmit={onSubmit}
        render={(formProps) => {
          return (
            <form onSubmit={formProps.handleSubmit}>
              <Stack tokens={{ childrenGap: 8 }} style={{ width: '300px' }}>
                <Stack horizontalAlign="center">
                  <Text nowrap variant="mega">
                    OMS
                  </Text>
                </Stack>
                <Field<string> name="username">{({ input }) => <CustomTextField label="username" {...input} />}</Field>
                <Field<string> name="password">{({ input }) => <CustomTextField label="password" {...input} />}</Field>
                <PrimaryButton type="submit" style={{ margin: '24px 0 0' }}>
                  Login
                </PrimaryButton>
              </Stack>
            </form>
          )
        }}
      />
    </Stack>
  )
}
