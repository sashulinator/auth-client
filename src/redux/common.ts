export const initBaseState = {
  loading: false,
  error: '',
}

export const initStateWithDataAsObject = {
  ...initBaseState,
  data: null,
  validationErrors: null,
}

export const initStateWithDataAsEntityList = {
  ...initBaseState,
  data: {
    total: 0,
    items: [],
  },
  currentPage: 1,
}
