import { ALERT, AUTH } from '../types';

import { postDataAPI, getDataAPI, deleteDataAPI, putDataAPI } from '../../utils/fetchData';

import Swal from 'sweetalert2';

export const login = (data) => async (dispatch) => {
    try {
        console.log('in');
        const res = await postDataAPI('auth/signin', data);
        localStorage.setItem('loggedIn', true);
        dispatch({
            type: AUTH,
            payload: res.data,
        });
        Swal.fire({
            didDestroy: false,
            icon: 'success',
            title: 'Success!',
            text: 'Login successfully!',
        });
    } catch (err) {
        Swal.fire({
            icon: 'error',
            title: 'Failed!',
            text: 'Wrong password or username!',
        });
        dispatch({
            type: ALERT,
            payload: {
                err: err,
            },
        });
    }
};

export const register = (data) => async (dispatch) => {
    try {
        const res = await postDataAPI('auth/signup', data);
        dispatch({
            type: ALERT,
            payload: {
                success: true,
            },
        });
        Swal.fire({
            icon: 'success',
            title: 'Success!',
            text: 'Register successfully!',
        });
    } catch (err) {
        Swal.fire({
            icon: 'error',
            title: 'Failed!',
            text: err.response.data.message,
        });
        dispatch({
            type: ALERT,
            payload: {
                err: err.response.data,
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
                    err: err,
                },
            });
        }
    }
};
