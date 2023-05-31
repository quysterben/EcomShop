import Image from 'next/image';
import { Input, Badge, Avatar, Popover, Button } from 'antd';
import Link from 'next/link';

import { AiOutlineShoppingCart } from 'react-icons/ai';
import { UserOutlined } from '@ant-design/icons';
import { FcAddDatabase } from 'react-icons/fc';

import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

import { logout } from '~/redux/actions/authAction';
import { useRouter } from 'next/router';

const Navbar = () => {
    const { auth } = useSelector((state) => state);
    const dispatch = useDispatch();
    const route = useRouter();
    const [checkLoggedIn, setCheckLoggedIn] = useState(false);

    useEffect(() => {
        const loggedIn = localStorage.getItem('loggedIn');
        if (loggedIn === 'true') {
            setCheckLoggedIn(true);
        }
    }, []);

    const handleLogout = () => {
        dispatch(logout());
        setCheckLoggedIn(false);
    };

    return (
        <div className="h-[64px] bg-white grid grid-cols-8 drop-shadow-md fixed w-full">
            <div className="col-span-1 flex justify-center cursor-pointer">
                <Image className="mx-auto" src="/logo.png" width={64} height={64} />
            </div>
            <div className="col-span-1 flex items-center cursor-pointer">
                <h2 className="text-primary mt-4">Ecom Shop</h2>
            </div>
            <div className="col-span-4 flex items-center justify-center">
                <Input.Search className="mx-14" placeholder="Input search text" allowClear />
            </div>
            {!checkLoggedIn ? (
                <>
                    <div className="col-span-1 flex items-center justify-end">
                        <Button onClick={() => route.push('/auth/signin')} type="primary">
                            Sign In
                        </Button>
                    </div>
                    <div className="col-span-1 flex items-center justify-center">
                        <Button onClick={() => route.push('/auth/signup')} type="secondary">
                            Sign Up
                        </Button>
                    </div>
                </>
            ) : (
                <>
                    <div className="col-span-1 flex items-center justify-center">
                        {auth.user.role === 1 ? (
                            <Badge className="cursor-pointer mt-2" count={0} showZero color="#A63D40">
                                <AiOutlineShoppingCart size="30px" />
                            </Badge>
                        ) : (
                            <FcAddDatabase
                                onClick={() => {
                                    route.push('/vendor/addProduct');
                                }}
                                className="cursor-pointer"
                                size="30px"
                            />
                        )}
                    </div>
                    <div className="col-span-1 flex items-center justify-center">
                        <Popover
                            content={
                                <div>
                                    <Link href="/user/profile">View profile</Link>
                                    <div>
                                        <Link href="/user/become-vendor">Become vendor</Link>
                                    </div>
                                    <div
                                        onClick={() => handleLogout()}
                                        className="font-bold hover:text-blue cursor-pointer"
                                    >
                                        Logout
                                    </div>
                                </div>
                            }
                            title={
                                <div>
                                    <Avatar size={28} icon={<UserOutlined />} />
                                    <span className="ml-4">{auth.user?.username}</span>
                                </div>
                            }
                        >
                            <Avatar size={40} icon={<UserOutlined />} />
                        </Popover>
                    </div>
                </>
            )}
        </div>
    );
};

export default Navbar;
