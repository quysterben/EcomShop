import { Button, Checkbox, Form, Input } from 'antd';

import { AiOutlineMail } from 'react-icons/ai';
import { RiLockPasswordFill } from 'react-icons/ri';
import { BsFacebook } from 'react-icons/bs';
import { FcGoogle } from 'react-icons/fc';
import Link from 'next/link';

import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useRef } from 'react';

import { login } from '~/redux/actions/authAction';
import Swal from 'sweetalert2';
import { useRouter } from 'next/router';
import { reset } from '~/redux/actions/alertAction';

const signin = () => {
    const { auth } = useSelector((state) => state);
    const dispatch = useDispatch();
    const route = useRouter();

    useEffect(() => {
        dispatch(reset({}));
        const loggedIn = localStorage.getItem('loggedIn');
        if (loggedIn === 'true') {
            route.push('/home');
        }
    }, [auth.token]);

    const emailData = useRef('');
    const passwordData = useRef('');

    const onFinish = () => {
        const data = {
            email: emailData.current.input.value,
            password: passwordData.current.input.value,
        };
        dispatch(login({ data }));
    };

    const onFinishFailed = () => {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Invalid data!',
        });
    };

    return (
        <div className="w-screen h-screen bg-aspagarus flex justify-center items-center">
            <div className="w-[520px] h-[600px] bg-white rounded-md drop-shadow-2xl ">
                <h2 className="mx-auto w-fit my-16 text-4xl">Login Account</h2>
                <Form
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    className="w-[400px] mx-auto"
                    name="login"
                    autoComplete="off"
                >
                    <Form.Item name="email" rules={[{ required: true, message: 'Please input your username!' }]}>
                        <Input ref={emailData} size="large" prefix={<AiOutlineMail />} placeholder="Email" />
                    </Form.Item>
                    <Form.Item name="password" rules={[{ required: true, message: 'Please input your username!' }]}>
                        <Input.Password
                            ref={passwordData}
                            size="large"
                            prefix={<RiLockPasswordFill />}
                            placeholder="Password"
                        />
                    </Form.Item>
                    <Form.Item>
                        <Checkbox className="mr-40">Save Password</Checkbox>
                        <Link href="/auth/reset-password">Forgot password?</Link>
                    </Form.Item>
                    <Form.Item>
                        <Button className="w-[400px] rounded-md" type="primary" htmlType="submit">
                            Login to Account
                        </Button>
                    </Form.Item>
                </Form>
                <h3 className="mx-auto w-fit my-4 font-thin">Or</h3>
                <div className="w-max grid grid-cols-4 gap-12 mx-auto">
                    <div className="col-span-2 cursor-pointer">
                        <BsFacebook size={38} color="#0000FF" />
                    </div>
                    <div className="col-span-2 cursor-pointer">
                        <FcGoogle size={38} color="#0000FF" />
                    </div>
                </div>
                <div className="w-max mt-8 mx-auto">
                    <p className="text-md">
                        Don't have account ? {'   '}
                        <Link className="font-bold" href="/auth/signup">
                            Singup
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default signin;
