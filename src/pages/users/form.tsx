import { PrimaryButton } from '@fluentui/react/lib/Button'
import { Stack } from '@fluentui/react/lib/Stack'
import { OnFail } from '@savchenko91/rc-redux-api-mw'

import { FC, useEffect } from 'react'
import { Field, Form, FormProps } from 'react-final-form'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'

import store from '@/app/redux-store'
import FieldError from '@/components/field-error'
import CustomTextField from '@/components/text-field'
import { clearValidationErrorsOnDestroy } from '@/helpers/clear-validation-errors'
import { createFieldError } from '@/helpers/create-field-error'
import * as userActions from '@/redux/user.actions'
import * as userSelectors from '@/redux/user.selector'
import { CreateUserInput, UpdateUserInput } from '@/types/entities'
import { ServerError } from '@/types/transfer'
import { validateNotUndefined } from '@/utils/errors/validators'
import { hasId } from '@/utils/has-id'
import { pick } from '@/utils/pick'

type FormUserInput = CreateUserInput & UpdateUserInput & { id?: string }

interface Props {
  initialValues: undefined | FormUserInput
  closeFormPanel: () => void
  onSucces: () => void
}

const CreateUser: FC<Props> = (props): JSX.Element => {
  const { t } = useTranslation()

  const actionName = !props.initialValues ? 'create' : 'update'

  const userState = useSelector(userSelectors[actionName])

  const initialValues = pick(props.initialValues, ['username', 'name', 'password', 'email', 'id'])

  useEffect(clearValidationErrorsOnDestroy, [])

  const onSubmit: FormProps<FormUserInput, FormUserInput>['onSubmit'] = (formData, formApi, setErrors) => {
    const onSuccess = () => {
      props.closeFormPanel()
      props.onSucces()
    }

    const onFail: OnFail<ServerError> = ({ body }) => {
      if (body?.errors) {
        setErrors?.(body?.errors)
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
              <Field name="username" validate={createFieldError('email', validateNotUndefined)}>
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
              <Field name="name">
                {({ input, meta }) => [
                  <CustomTextField key="1" label={t(`entities.user.${input.name}`)} {...input} />,
                  <FieldError key="2" error={meta.touched && (meta.error || meta.submitError)} />,
                ]}
              </Field>
              <Field name="email" validate={createFieldError('email', validateNotUndefined)}>
                {({ input, meta }) => [
                  <CustomTextField key="1" label={t(`entities.user.${input.name}`)} {...input} />,
                  <FieldError key="2" error={meta.touched && (meta.error || meta.submitError)} />,
                ]}
              </Field>
              <Field type="password" name="password" validate={createFieldError('email', validateNotUndefined)}>
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
