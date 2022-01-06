import { FC } from 'react'
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

interface Props {
  defaultValues: undefined | User
  onClose: () => void
}

const CreateUser: FC<Props> = (props): JSX.Element => {
  const { t } = useTranslation()

  const isCreate = !props.defaultValues

  const userCreateState = useSelector(userSelectors.create)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<User>()

  function onSuccess() {
    props.onClose()
    store.dispatch(userActions.getList())
  }

  function onSubmit(formData: User) {
    const userUpdate = { ...formData, id: props.defaultValues?.id as number }

    isCreate
      ? store.dispatch(userActions.create(formData, { onSuccess }))
      : store.dispatch(userActions.update(userUpdate, { onSuccess }))
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
              message={
                errors.name?.message ||
                userCreateState.validationErrors?.name?.message
              }
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
              message={
                errors.email?.message ||
                userCreateState.validationErrors?.email?.message
              }
            />
          </div>
          <PrimaryButton disabled={userCreateState.loading} type="submit">
            {userCreateState.loading ? 'Saving...' : 'Save'}
          </PrimaryButton>
        </Stack>
      </form>
    </div>
  )
}

export default CreateUser
