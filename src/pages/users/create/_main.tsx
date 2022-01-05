import { FC } from 'react'
import { TextField } from '@fluentui/react/lib/TextField'
import { Stack } from '@fluentui/react/lib/Stack'
import { PrimaryButton } from '@fluentui/react/lib/Button'
import { useForm } from 'react-hook-form'
import FieldError from '../../../components/field-error'
import { validate } from '../../../utils/validate'
import { required } from '../../../utils/validators'
import { User } from '../../../types/entities'

const CreateUser: FC = (): JSX.Element => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<User>()
  const onSubmit = (data: any) => console.log(data)

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
            <FieldError message={errors.name?.message} />
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
            <FieldError message={errors.email?.message} />
          </div>
          <PrimaryButton type="submit">Create</PrimaryButton>
        </Stack>
      </form>
    </div>
  )
}

export default CreateUser
