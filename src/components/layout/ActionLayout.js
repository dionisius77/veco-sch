import {
    AUTH_FETCH,
    AUTH_FAILED,
    AUTH_SUCCESS,
    GET_LOGIN,
    PUSH_LOGIN,
    GET_LOADING,
    PUSH_LOADING
  } from './ConfigLayout';
  
  export const authFetch = value => ({ type: AUTH_FETCH, send: value });
  export const authFailed = value => ({ type: AUTH_FAILED, err: value });
  export const authSuccess = value => ({ type: AUTH_SUCCESS, res: value });

  export const getLogin = value => ({ type: GET_LOGIN, value: value });
  export const pushLogin = value => ({ type: PUSH_LOGIN, value: value });

  export const getLoading = value => ({ type: GET_LOADING, value: value});
  export const pushLoading = value => ({ type: PUSH_LOADING, value: value});