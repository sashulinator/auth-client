import { ServerCollectableError } from '@/types/transfer'
import { StageAction, StageActionTypes } from '@savchenko91/rc-redux-api-mw'

export const CLEAR_VALIDATION_ERRORS = 'COMMON/CLEAR_VALIDATION_ERRORS'

interface State<D> {
  data: D
  loading: boolean
  error: string
  validationErrors?: Record<string, ServerCollectableError> | null
}

export type Reducer<Data> = (
  state: State<Data>,
  action: StageAction<{ error?: string; errors?: Record<string, ServerCollectableError> } & Data>
) => State<Data> | void

export function createAPIReducer<Data>(
  initState: State<Data>,
  stageActionTypes: StageActionTypes,
  customReducers: Reducer<Data>[] = []
): Reducer<Data> {
  return (state = initState, action): State<Data> => {
    for (let index = 0; index < customReducers?.length; index++) {
      const customReducer = customReducers[index]
      const customState = customReducer(state, action)
      if (customState) {
        return customState
      }
    }

    switch (action.type) {
      case stageActionTypes.START: {
        const newState = {
          ...state,
          loading: true,
          error: '',
        }

        initState.validationErrors !== undefined ? (newState.validationErrors = null) : null

        return newState
      }

      case stageActionTypes.FAIL: {
        const newState = {
          ...state,
          loading: false,
          error: action.payload.body?.error || '',
        }

        initState.validationErrors !== undefined
          ? (newState.validationErrors = action.payload.body?.errors || null)
          : null

        return newState
      }

      case stageActionTypes.SUCCESS: {
        const newState = {
          ...state,
          loading: false,
          error: '',
          data: action.payload.body || initState.data,
        }

        initState.validationErrors !== undefined ? (newState.validationErrors = null) : null

        return newState
      }
      case CLEAR_VALIDATION_ERRORS: {
        return {
          ...state,
          validationErrors: null,
        }
      }

      default:
        return state
    }
  }
}
