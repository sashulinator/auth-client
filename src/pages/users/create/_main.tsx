import { FC } from 'react'
import { TextField } from '@fluentui/react/lib/TextField'
import { Stack } from '@fluentui/react/lib/Stack'
import { PrimaryButton } from '@fluentui/react/lib/Button'
import { useForm } from 'react-hook-form'
import FieldError from '../../../components/field-error'
import { validate } from '../../../utils/validate'
import { required } from '../../../utils/validators'
import { User } from '../../../types/entities'
import * as userActions from '@/redux/user.actions'
import store from '@/app/redux-store'
import * as userSelectors from '@/redux/user.selector'
import { useSelector } from 'react-redux'

const CreateUser: FC = (): JSX.Element => {
  const userCreateState = useSelector(userSelectors.create)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<User>()

  function onSubmit(formData: User) {
    store.dispatch(userActions.create(formData))
  }

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack tokens={{ padding: '20px 40px' }}>
          <h1>Create user</h1>
        </Stack>
        <Stack
          tokens={{ padding: '20px 40px', maxWidth: 400, childrenGap: 10 }}
        >
          <div>
            <TextField
              label="name"
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
              label="email"
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
            {userCreateState.loading ? 'Creating...' : 'Create'}
          </PrimaryButton>
        </Stack>
      </form>
    </div>
  )
}

export default CreateUser
