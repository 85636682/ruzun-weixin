import * as types from './mutation-types'

export const catchError = ({ dispatch }, error) => {
  if (error.type === 'Authorization') {
    dispatch(types.SIGN_OUT)
  }
  dispatch(types.SHOW_TOAST, error.message)
}

export const showToast = ({ dispatch }, message) => {
  dispatch(types.SHOW_TOAST, message)
}

export const hideToast = ({ dispatch }) => {
  dispatch(types.HIDE_TOAST)
}

export const signin = ({ dispatch }, user) => {
  dispatch(types.SIGN_IN, user)
}

export const signout = ({ dispatch }) => {
  dispatch(types.SIGN_OUT)
}

export const setCurrentUser = ({ dispatch }, user) => {
  dispatch(types.SET_CURRENT_USER, user)
}

export const setAuthorized = ({ dispatch }, token) => {
  dispatch(types.SET_AUTHORIZED, token)
}
