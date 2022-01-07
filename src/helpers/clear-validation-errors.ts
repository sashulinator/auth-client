import store from '@/app/redux-store'
import { CLEAR_VALIDATION_ERRORS } from '@/utils/create-api-reducer'

export function clearValidationErrors() {
  store.dispatch({ type: CLEAR_VALIDATION_ERRORS })
}

export function clearValidationErrorsOnDestroy() {
  return () => {
    store.dispatch({ type: CLEAR_VALIDATION_ERRORS })
  }
}
