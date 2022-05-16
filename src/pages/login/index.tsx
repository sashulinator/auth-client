import { PrimaryButton, Stack } from '@fluentui/react'

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
    navigate(ROUTES.INCIDENT_LIST.buildURL())
  }

  return (
    <Stack as="main" className="Login">
      <Form
        onSubmit={onSubmit}
        render={(formProps) => {
          return (
            <form onSubmit={formProps.handleSubmit}>
              <Field<string> name="username">{({ input }) => <CustomTextField label="username" {...input} />}</Field>
              <Field<string> name="password">{({ input }) => <CustomTextField label="password" {...input} />}</Field>
              <PrimaryButton type="submit">Login</PrimaryButton>
            </form>
          )
        }}
      />
    </Stack>
  )
}
