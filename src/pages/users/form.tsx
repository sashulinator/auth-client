import { PrimaryButton } from '@fluentui/react/lib/Button'
import { Stack } from '@fluentui/react/lib/Stack'
import { OnFail } from '@savchenko91/rc-redux-api-mw'

import { createUserSchema, updateUserSchema } from './user.validators'
import { FC, useEffect } from 'react'
import { Field, Form, FormProps } from 'react-final-form'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'

import store from '@/app/redux-store'
import FieldError from '@/components/field-error'
import CustomTextField from '@/components/text-field'
import { clearValidationErrorsOnDestroy } from '@/helpers/clear-validation-errors'
import { validateAdapter as by } from '@/helpers/validators'
import * as userActions from '@/redux/user.actions'
import * as userSelectors from '@/redux/user.selector'
import { CreateUserInput, UpdateUserInput } from '@/types/entities'
import { ServerError } from '@/types/transfer'
import { hasId } from '@/utils/has-id'
import { pick } from '@/utils/pick'

type FormUserInput = CreateUserInput & UpdateUserInput

interface Props {
  initialValues: undefined | FormUserInput
  closeFormPanel: () => void
  onSucces: () => void
}

const CreateUser: FC<Props> = (props): JSX.Element => {
  const { t } = useTranslation()

  const actionName = !props.initialValues ? 'create' : 'update'

  const userSchema = !props.initialValues ? createUserSchema : updateUserSchema

  const userState = useSelector(userSelectors[actionName])

  const initialValues = pick(props.initialValues, ['username', 'name', 'password', 'email', 'id'])

  useEffect(clearValidationErrorsOnDestroy, [])

  const onSubmit: FormProps<FormUserInput, FormUserInput>['onSubmit'] = (formData, formApi, setErrors) => {
    const onSuccess = () => {
      props.closeFormPanel()
      props.onSucces()
    }

    const onFail: OnFail<ServerError> = ({ body }) => {
      if (body?._errors) {
        setErrors?.(body?._errors)
      }
    }

    if (hasId(formData)) {
      store.dispatch(userActions.update(formData, { onSuccess, onFail }))
    } else {
      store.dispatch(userActions.create(formData, { onSuccess, onFail }))
    }
  }

  return (
    <Form<FormUserInput, FormUserInput>
      onSubmit={onSubmit}
      initialValues={initialValues}
      render={(formProps) => {
        return (
          <form onSubmit={formProps.handleSubmit}>
            <Stack
              tokens={{
                padding: '20px 0 0 0',
                maxWidth: 400,
                childrenGap: 10,
              }}
            >
              <Field<string> name="username" validate={by(userSchema)}>
                {({ input, meta }) => [
                  <CustomTextField
                    key="1"
                    label={t(`entities.user.${input.name}`)}
                    autoFocus
                    autoFocusDelay={200}
                    {...input}
                  />,
                  <FieldError key="2" error={meta.touched && (meta.error || meta.submitError)} />,
                ]}
              </Field>
              <Field<string> name="name" validate={by(userSchema)}>
                {({ input, meta }) => [
                  <CustomTextField key="1" label={t(`entities.user.${input.name}`)} {...input} />,
                  <FieldError key="2" error={meta.touched && (meta.error || meta.submitError)} />,
                ]}
              </Field>
              <Field<string> name="email" validate={by(userSchema)}>
                {({ input, meta }) => [
                  <CustomTextField key="1" label={t(`entities.user.${input.name}`)} {...input} />,
                  <FieldError key="2" error={meta.touched && (meta.error || meta.submitError)} />,
                ]}
              </Field>
              <Field<string> type="password" name="password" validate={by(userSchema)}>
                {({ input, meta }) => [
                  <CustomTextField key="1" label={t(`entities.user.${input.name}`)} {...input} />,
                  <FieldError key="2" error={meta.touched && (meta.error || meta.submitError)} />,
                ]}
              </Field>
              <PrimaryButton disabled={userState.loading || formProps.pristine} type="submit">
                {userState.loading ? t('buttons.saving') : t('buttons.save')}
              </PrimaryButton>
            </Stack>
          </form>
        )
      }}
    />
  )
}

export default CreateUser
