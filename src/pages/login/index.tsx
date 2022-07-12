import { Stack, Text } from '@fluentui/react'

import './index.css'

import axios from 'axios'
import React from 'react'
import { Field, Form } from 'react-final-form'
import { useNavigate } from 'react-router-dom'

import { LoginResponse, Transfer } from '@/api/types'
import ROUTES from '@/constants/routes'
import { LayoutNames, useSetLayout } from '@/lib/set-layout'
import { Button } from '@/shared/button'
import CustomTextField from '@/shared/textfield'
import { errorMessage } from '@/shared/toast'

export default function Login(): JSX.Element {
  useSetLayout(LayoutNames.main)

  const navigate = useNavigate()

  async function onSubmit(data: Record<string, unknown>) {
    try {
      await axios.post<Transfer<LoginResponse>>('api/auth', data)
      navigate(ROUTES.SCHEMA_LIST.PATH)
    } catch (e) {
      errorMessage('Неверный логин или пароль')
    }
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
                <Field<string> name="email" required>
                  {({ input }) => <CustomTextField label="email" {...input} />}
                </Field>
                <Field<string> name="password" required>
                  {({ input }) => <CustomTextField label="password" type="password" canRevealPassword {...input} />}
                </Field>
                <Button type="submit" style={{ margin: '24px 0 0' }} text="t.buttons.login" />
              </Stack>
            </form>
          )
        }}
      />
    </Stack>
  )
}
