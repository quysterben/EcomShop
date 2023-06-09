import { combineReducers } from 'redux';
import alertReducer from './alertReducer';
import authReducer from './authReducer';
import productReducer from './productReducer';

export default combineReducers({
    alert: alertReducer,
    auth: authReducer,
    product: productReducer,
});
