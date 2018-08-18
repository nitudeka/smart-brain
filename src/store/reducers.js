const initialState = {
  input: '',
  loading: false,
  box: {},
  route: 'signin',
  isSignedIn: false,
  user: {
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: ''
  }
}

export const reducer = (state=initialState, action={}) => {
  switch (action.type) {
    case 'INPUT':
      return {
        ...state,
        input: action.input
      }
    case 'LOADING':
      return {
        ...state,
        loading: !state.loading
      }
    default:
      return state;
  }
}
