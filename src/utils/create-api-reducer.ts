import { StageAction, StageActionTypes } from '@savchenko91/rc-redux-api-mw'

interface State<D> {
  data: D
  loading: boolean
  error: string
}

export function createAPIReducer<Data>(
  initialState: State<Data>,
  stageActionTypes: StageActionTypes
) {
  return (
    state: State<Data>,
    action: StageAction<{ error?: string } & Data>
  ): State<Data> => {
    switch (action.type) {
      case stageActionTypes.START:
        return {
          ...state,
          loading: true,
          error: '',
        }
      case stageActionTypes.FAIL:
        return {
          ...state,
          loading: false,
          error: action.payload.body?.error || '',
        }
      case stageActionTypes.SUCCESS:
        return {
          ...state,
          loading: false,
          error: '',
          data: action.payload.body || initialState.data,
        }
      default:
        return initialState
    }
  }
}
