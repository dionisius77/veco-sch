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
  MASTER_DATA_FETCH,
  MASTER_DATA_FAILED,
  MASTER_DATA_SUCCESS,
  AUTH_DEFAULT
} from './ConfigLayout';

export const authFetch = value => ({ type: AUTH_FETCH, send: value });
export const authFailed = value => ({ type: AUTH_FAILED, err: value });
export const authSuccess = value => ({ type: AUTH_SUCCESS, res: value });
export const authDefault = value => ({ type: AUTH_DEFAULT, res: value });

export const masterDataFetch = value => ({type: MASTER_DATA_FETCH, send: value });
export const masterDataFailed = value => ({type: MASTER_DATA_FAILED, err: value });
export const masterDataSuccess = value => ({type: MASTER_DATA_SUCCESS, res: value });

export const getLogin = value => ({ type: GET_LOGIN, value: value });
export const pushLogin = value => ({ type: PUSH_LOGIN, value: value });

export const getLoading = value => ({ type: GET_LOADING, value: value });
export const pushLoading = value => ({ type: PUSH_LOADING, value: value });

export const getAlert = value => ({ type: GET_ALERT, value: value });
export const pushAlert = value => ({ type: PUSH_ALERT, value: value });