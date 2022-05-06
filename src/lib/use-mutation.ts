import { ValidationError, isObject } from '@savchenko91/schema-validator'

import { useTranslation } from 'react-i18next'
import { MutationFunction, UseMutationOptions, UseMutationResult, useMutation } from 'react-query'

import { errorMessage } from '@/shared/toast'

function isValidationError(error: unknown): error is ValidationError {
  if (isObject(error) && '_code' in error) {
    return true
  }
  return false
}

const useAppMutation = <TResult, TVariables = undefined, TSnapshot = unknown>(
  mutationFn: MutationFunction<TResult, TVariables>,
  mutationConfig?: UseMutationOptions<TResult, unknown, TVariables, TSnapshot>
): UseMutationResult<TResult, unknown, TVariables, TSnapshot> => {
  const { t } = useTranslation()

  const onError: UseMutationOptions<TResult, Error, TVariables, TSnapshot>['onError'] = (
    error: unknown,
    ...args
  ): void => {
    if (isValidationError(error)) {
      errorMessage(t(error._code))
    } else {
      errorMessage(t('unknownError'))
    }

    if (isObject(error)) {
      console.log({ ...error })
    }

    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    mutationConfig?.onError?.(error, ...args)
  }

  const newMutationConfig = mutationConfig ? { onError, ...mutationConfig } : { onError }

  return useMutation<TResult, Error, TVariables, TSnapshot>(mutationFn, newMutationConfig)
}

export default useAppMutation
