import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { refreshToken } from '~/redux/actions/authAction';

const RefreshTokenHandle = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(refreshToken());
    });

    return <div></div>;
};

export default RefreshTokenHandle;
