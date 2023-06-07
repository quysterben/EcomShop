import { PRODUCT } from '../types';

const initialState = {
    data: [],
};

const productReducer = (state = initialState, action) => {
    switch (action.type) {
        case PRODUCT.GET_ALL_PRODUCTS:
            return action.payload;
        default:
            return state;
    }
};

export default productReducer;
