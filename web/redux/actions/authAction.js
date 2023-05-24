import { ALERT, AUTH } from '../types';

import { postDataAPI, getDataAPI, deleteDataAPI, putDataAPI } from '../../utils/fetchData';

export const login = (data) => async (dispatch) => {
    try {
        const res = await postDataAPI('/auth/signin/', data);
        localStorage.setItem('loggedIn', true);
        dispatch({
            type: AUTH,
            payload: res,
        });
        location.replace('/');
    } catch (err) {
        dispatch({
            type: ALERT,
            payload: {
                err: err,
            },
        });
    }
};

export const logout = () => async (dispatch) => {
    const res = await postDataAPI('/auth/logout/');
    localStorage.setItem('loggedIn', false);
    dispatch({
        type: AUTH,
        payload: {
            token: null,
            user: null,
        },
    });
    location.replace('/');
};

export const refreshToken = () => async (dispatch) => {
    const loggedIn = localStorage.getItem('loggedIn');
    if (loggedIn) {
        try {
            const res = await postDataAPI('/auth/refreshtoken/');
            dispatch({
                type: AUTH,
                payload: {
                    token: res.data.token,
                    data: res.data.user,
                },
            });
        } catch (err) {
            dispatch({
                type: ALERT,
                payload: {
                    err: err.response.message,
                },
            });
        }
    }
};
