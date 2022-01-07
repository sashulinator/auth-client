import { FC, useEffect } from 'react'
import { TextField } from '@fluentui/react/lib/TextField'
import { Stack } from '@fluentui/react/lib/Stack'
import { PrimaryButton } from '@fluentui/react/lib/Button'
import { useForm } from 'react-hook-form'
import FieldError from '../../components/field-error'
import { validate } from '../../utils/validate'
import { required } from '../../utils/validators'
import { User } from '../../types/entities'
import * as userActions from '@/redux/user.actions'
import store from '@/app/redux-store'
import * as userSelectors from '@/redux/user.selector'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { clearValidationErrorsOnDestroy } from '@/helpers/clear-validation-errors'

interface Props {
  defaultValues: undefined | User
  closePanel: () => void
}

const CreateUser: FC<Props> = (props): JSX.Element => {
  const { t } = useTranslation()

  const actionName = !props.defaultValues ? 'create' : 'update'
  const userState = useSelector(userSelectors[actionName])

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm<User>()

  useEffect(clearValidationErrorsOnDestroy, [])

  function onSuccess() {
    props.closePanel()
    store.dispatch(userActions.getList())
  }

  function onSubmit(formData: User) {
    const userInput = { ...formData, id: props.defaultValues?.id as number }
    store.dispatch(userActions[actionName](userInput, { onSuccess }))
  }

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack
          tokens={{ padding: '20px 0 0 0', maxWidth: 400, childrenGap: 10 }}
        >
          <div>
            <TextField
              label={t('entities.user.name')}
              defaultValue={props.defaultValues?.name}
              aria-label="name"
              autoComplete="off"
              {...register('name', {
                validate: validate([required]),
              })}
            />
            <FieldError
              name="name"
              formErrors={errors}
              serverErrors={userState}
            />
          </div>
          <div>
            <TextField
              label={t('entities.user.email')}
              defaultValue={props.defaultValues?.email}
              autoComplete="off"
              aria-label="email"
              {...register('email', {
                validate: validate([required]),
              })}
            />
            <FieldError
              name="email"
              formErrors={errors}
              serverErrors={userState}
            />
          </div>
          <PrimaryButton disabled={userState.loading || !isDirty} type="submit">
            {userState.loading ? 'Saving...' : 'Save'}
          </PrimaryButton>
        </Stack>
      </form>
    </div>
  )
}

export default CreateUser
