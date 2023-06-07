import Navbar from '~/components/Navbar';

import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { getAllProducts } from '~/redux/actions/productAction';

import { Button, Card, Rate } from 'antd';

const Home = () => {
    const { product } = useSelector((state) => state);
    const dispatch = useDispatch();

    useState(() => {
        dispatch(getAllProducts());
    }, []);

    return (
        <div>
            <Navbar />
            <div className="mt-[84px] grid grid-cols-6 mx-28">
                {product.data.map((param) => (
                    <div key={param._id}>
                        <Card
                            hoverable
                            className="w-[190px] rounded-lg"
                            cover={<img className="w-[190px] h-[188px]" alt="example" src={param.imageURLs[0]} />}
                        >
                            <h5>₫ {param.price.toLocaleString()}</h5>
                            <h3 className="font-bold">{param.product_name}</h3>
                            <Rate disabled defaultValue={2.5} />
                            <Button
                                className="px-10 rounded-3xl mt-4 focus:text-aspagarus focus:border-aspagarus hover:text-aspagarus hover:border-aspagarus"
                                type="secondary"
                            >
                                Buy now
                            </Button>
                        </Card>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Home;
