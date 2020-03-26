import { combineReducers } from 'redux';
import LoadReducers from '../config/ReduxReducer';

const reduxReducer = combineReducers(LoadReducers);

const rootReducer = (state, action) => reduxReducer(state, action);

export default rootReducer;