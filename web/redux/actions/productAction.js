import { ALERT, PRODUCT } from '../types';

import { postDataAPI, getDataAPI, deleteDataAPI, putDataAPI } from '../../utils/fetchData';

import Swal from 'sweetalert2';

export const getAllProducts = () => async (dispatch) => {
    try {
        const res = await getDataAPI('product/getAllProducts');
        dispatch({
            type: PRODUCT.GET_ALL_PRODUCTS,
            payload: res,
        });
    } catch (err) {
        console.log(err);
        Swal.fire({
            icon: 'error',
            title: 'Failed!',
            text: 'Get all product failed!',
        });
        dispatch({
            type: ALERT,
            payload: {
                err: err,
            },
        });
    }
};
