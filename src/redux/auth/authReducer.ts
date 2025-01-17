import { FormError, ResponseError } from "../../models/IError"
import { UserProfile } from "../../models/IUserProfile"
import { AppAuthActions } from "./authActions"
import { AuthConstants } from "./authConstants"

type AuthState = typeof intitialState

const intitialState = {
  isAuth: false,
  profile: {} as UserProfile,
  isFetchingData: false,
  responseErrors: {} as ResponseError,
  formErrors: [] as FormError[],
  errorMessage: '',
}

export const authReducer = (
  state = intitialState,
  action: AppAuthActions
): AuthState => {
  switch (action.type) {
    case AuthConstants.SET_IS_AUTH:
      return { ...state, isAuth: action.payload }

    case AuthConstants.IS_FETHCHING_AUTH_DATA:
      return { ...state, isFetchingData: !state.isFetchingData }
  
    case AuthConstants.SET_PROFILE_INFO:
      return { ...state, profile: action.payload }
  
    case AuthConstants.SET_RESPONSE_ERROR:
      return { ...state, responseErrors: action.payload }
  
    case AuthConstants.SET_FORM_ERROR:
      return { ...state, formErrors: action.payload }
  
    case AuthConstants.SET_AUTH_ERROR_MESSAGE:
      return { ...state, errorMessage: action.payload }
    default:
      return state
  }
}
