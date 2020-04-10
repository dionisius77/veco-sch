import {
  AUTH_FETCH,
  AUTH_FAILED,
  AUTH_SUCCESS,
  GET_LOGIN,
  PUSH_LOGIN,
  GET_LOADING,
  PUSH_LOADING,
  GET_ALERT,
  PUSH_ALERT,
} from './ConfigLayout';

const initialState = {
  action: '',
  fetchAuth: false,
  sendAuth: null,
  resAuth: null,
  errAuth: null,
  loggedin: false,
  loadingFlag: false,
  alert: {
    isOpen: false,
    message: '',
    type: 'success'
  }
};

export function ReducerLayout(state = initialState, action) {
  switch (action.type) {
    case AUTH_FETCH:
      return {
        ...state,
        fetchAuth: true,
        sendAuth: action.send,
        action: action.type,
      };

    case AUTH_SUCCESS:
      return {
        ...state,
        fetchAuth: false,
        resAuth: action.res,
        action: action.type,
      };

    case AUTH_FAILED:
      return {
        ...state,
        fetchAuth: false,
        errAuth: action.err,
        action: action.type,
      };

    case PUSH_LOGIN:
      initialState.loggedin = action.value;
      return {
        ...state,
        loggedin: initialState.loggedin,
        action: action.type
      }

    case GET_LOGIN:
      return {
        ...state,
        loggedin: initialState.loggedin,
        action: action.type
      }

    case GET_LOADING:
      return {
        ...state,
        loadingflag: initialState.loadingFlag,
        action: action.type
      }

    case PUSH_LOADING:
      initialState.loadingFlag = action.value;
      return {
        ...state,
        loadingFlag: initialState.loadingFlag,
        action: action.type
      }
    
    case PUSH_ALERT:
      initialState.alert = action.value;
      return {
        ...state,
        alert: initialState.alert,
        action: action.type
      }

    case GET_ALERT:
      return {
        ...state,
        alert: initialState.alert,
        action: action.type,
      }

    default:
      return state;
  }
}
