import { ValidationError } from '@/types/transfer'
import { StageAction, StageActionTypes } from '@savchenko91/rc-redux-api-mw'

interface State<D> {
  data: D
  loading: boolean
  error: string
  validationErrors?: Record<string, ValidationError> | null
}

export function createAPIReducer<Data>(
  initState: State<Data>,
  stageActionTypes: StageActionTypes
) {
  return (
    state: State<Data>,
    action: StageAction<
      { error?: string; errors?: Record<string, ValidationError> } & Data
    >
  ): State<Data> => {
    switch (action.type) {
      case stageActionTypes.START: {
        const newState = {
          ...state,
          loading: true,
          error: '',
        }

        initState.validationErrors !== undefined
          ? (newState.validationErrors = null)
          : null

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

        initState.validationErrors !== undefined
          ? (newState.validationErrors = null)
          : null

        return newState
      }

      default:
        return initState
    }
  }
}
