import Image from 'next/image';
import { Badge, Avatar, Popover, Button } from 'antd';
import Link from 'next/link';

import { AiOutlineShoppingCart } from 'react-icons/ai';
import { UserOutlined } from '@ant-design/icons';
import { FaClipboardList } from 'react-icons/fa';

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
        <div className="h-[64px] bg-white grid border-b-4 grid-cols-8 fixed w-full drop-shadow-md top-0 z-10">
            <div onClick={() => route.push('/home')} className="col-span-1 flex justify-end cursor-pointer">
                <Image src="/logo.jpg" width={(64 / 5) * 8} height={64} />
            </div>
            <div onClick={() => route.push('/home')} className="col-span-1 flex items-center cursor-pointer">
                <h2 className="text-primary mt-2 font-bold">Ecom Shop</h2>
            </div>
            <div className="col-span-4 flex items-center justify-center">
                <ul className="list-none">
                    <li
                        onClick={() => route.push('/home')}
                        className="inline-block mx-8 text-base cursor-pointer font-semibold text-light hover:text-primary"
                    >
                        Home
                    </li>

                    <li
                        onClick={() => route.push('/home')}
                        className="inline-block mx-8 text-base cursor-pointer font-semibold text-light hover:text-primary"
                    >
                        Contact
                    </li>
                    <li
                        onClick={() => route.push('/home')}
                        className="inline-block mx-8 text-base cursor-pointer font-semibold text-light hover:text-primary"
                    >
                        About us
                    </li>
                </ul>
            </div>
            {!checkLoggedIn ? (
                <>
                    <div className="col-span-1 flex items-center justify-end">
                        <Button className="px-10 rounded-3xl" onClick={() => route.push('/auth/signin')} type="primary">
                            Sign In
                        </Button>
                    </div>
                    <div className="col-span-1 flex items-center justify-center">
                        <Button
                            className="px-10 rounded-3xl"
                            onClick={() => route.push('/auth/signup')}
                            type="secondary"
                        >
                            Sign Up
                        </Button>
                    </div>
                </>
            ) : (
                <>
                    <div className="col-span-1 flex items-center justify-end">
                        {auth.user.role === 1 ? (
                            <Badge className="cursor-pointer mt-3" count={0} showZero color="#90A959">
                                <AiOutlineShoppingCart size="28px" />
                            </Badge>
                        ) : (
                            <Button
                                size="small"
                                className="px-4"
                                onClick={() => route.push('/vendor/dashboard')}
                                type="primary"
                            >
                                Dashboard
                            </Button>
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
