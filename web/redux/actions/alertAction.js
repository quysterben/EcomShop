import { ALERT } from '../types';

export const reset = (data) => async (dispatch) => {
    dispatch({
        type: ALERT,
        payload: data,
    });
};
