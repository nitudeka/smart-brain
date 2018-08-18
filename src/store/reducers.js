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
    case 'FACE_LOCATION_BOX':
      return {
        ...state,
        box: action.box
      }
    default:
      return state;
  }
}
