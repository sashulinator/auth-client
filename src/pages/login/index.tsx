import { PrimaryButton, Stack } from '@fluentui/react'
import { OnFail } from '@savchenko91/rc-redux-api-mw'

import './index.css'
// import ROUTES from '../../constants/routes'
import { FC } from 'react'
import { Field, Form, FormProps } from 'react-final-form'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'

import store from '@/app/redux-store'
import FieldError from '@/components/field-error'
import CustomTextField from '@/components/text-field'
import { actions, selectors } from '@/redux/auth'
import { Credentials } from '@/types/entities'
import { ServerError } from '@/types/transfer'

const Login: FC = (): JSX.Element => {
  const { t } = useTranslation()

  const authLoginState = useSelector(selectors.login)

  const onSubmit: FormProps<Credentials>['onSubmit'] = (formData, formApi, setErrors) => {
    const onFail: OnFail<ServerError> = ({ body }) => {
      if (body?._errors) {
        setErrors?.(body?._errors)
      }
    }

    store.dispatch(actions.login(formData, { onFail }))
  }

  return (
    <div className="Login">
      <Stack tokens={{ padding: '20px 40px' }}>
        <h1>{t('pagesNames.login')}</h1>
      </Stack>
      <Form
        onSubmit={onSubmit}
        render={(formProps) => {
          return (
            <form onSubmit={formProps.handleSubmit}>
              <Stack
                tokens={{
                  padding: '20px 40px',
                  childrenGap: 10,
                }}
                horizontalAlign="center"
              >
                <Field<string> name="username">
                  {({ input, meta }) => [
                    <CustomTextField
                      styles={{
                        root: {
                          width: '100%',
                        },
                      }}
                      key="1"
                      label={t(`entities.user.${input.name}`)}
                      {...input}
                    />,
                    <FieldError key="2" error={meta.touched && (meta.error || meta.submitError)} />,
                  ]}
                </Field>
                <Field<string> type="password" name="password">
                  {({ input, meta }) => [
                    <CustomTextField
                      styles={{
                        root: {
                          width: '100%',
                        },
                      }}
                      key="1"
                      label={t(`entities.user.${input.name}`)}
                      {...input}
                    />,
                    <FieldError key="2" error={meta.touched && (meta.error || meta.submitError)} />,
                  ]}
                </Field>
                <PrimaryButton
                  disabled={authLoginState.loading || formProps.pristine}
                  type="submit"
                  styles={{
                    root: {
                      width: '100%',
                    },
                  }}
                >
                  {authLoginState.loading ? t('buttons.saving') : t('buttons.save')}
                </PrimaryButton>
              </Stack>
            </form>
          )
        }}
      />
    </div>
  )
}

export default Login
