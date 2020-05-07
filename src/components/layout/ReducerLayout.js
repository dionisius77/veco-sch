import {
  AUTH_FETCH,
  AUTH_FAILED,
  AUTH_SUCCESS,
  AUTH_DEFAULT,
  GET_LOGIN,
  PUSH_LOGIN,
  GET_LOADING,
  PUSH_LOADING,
  GET_ALERT,
  PUSH_ALERT,
  MASTER_DATA_SUCCESS,
  MASTER_DATA_FETCH,
  MASTER_DATA_FAILED,
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
    open: false,
    message: '',
    type: 'success'
  },
  fetchMasterData: true,
  sendMasterData: null,
  resMasterData: null
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

    case AUTH_DEFAULT:
      initialState.resAuth = null;
      return {
        ...state,
        resAuth: initialState.resAuth,
        action: action.type
      }

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

    case MASTER_DATA_FETCH:
      return {
        ...state,
        fetchMasterData: true,
        sendMasterData: action.send,
        action: action.type
      }

    case MASTER_DATA_SUCCESS:
      state.resMasterData = action.res;
      return {
        ...state,
        fetchMasterData: false,
        resMasterData: state.resMasterData,
        action: action.type
      }

    case MASTER_DATA_FAILED:
      return {
        ...state,
        fetchMasterData: false,
        errMasterData: action.err,
        action: action.type
      }

    default:
      return state;
  }
}
