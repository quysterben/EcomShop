import { Button, Checkbox, Form, Input } from 'antd';

import { AiOutlineMail } from 'react-icons/ai';
import { RiLockPasswordFill } from 'react-icons/ri';
import { FaUser } from 'react-icons/fa';
import Swal from 'sweetalert2';

import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { useRef, useEffect } from 'react';

import { register } from '~/redux/actions/authAction';

const signup = () => {
    const { auth, alert } = useSelector((state) => state);
    const dispatch = useDispatch();
    const router = useRouter();

    const emailData = useRef('');
    const password = useRef('');
    const username = useRef('');

    useEffect(() => {
        const loggedIn = localStorage.getItem('loggedIn');
        if (loggedIn === 'true') {
            router.push('/');
        }
        if (alert.success === true) {
            router.push('/auth/signin');
        }
    }, [auth.token, alert.success]);

    const onFinish = () => {
        const data = {
            email: emailData.current.input.value,
            username: username.current.input.value,
            password: password.current.input.value,
        };
        dispatch(register({ data }));
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
                <h2 className="mx-auto w-fit my-16 text-4xl">Create New Account</h2>
                <Form
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    className="w-[400px] mx-auto"
                    name="login"
                    autoComplete="off"
                >
                    <Form.Item name="email" rules={[{ required: true, message: 'Please input your email!' }]}>
                        <Input ref={emailData} size="large" prefix={<AiOutlineMail />} placeholder="Email" />
                    </Form.Item>
                    <Form.Item name="username" rules={[{ required: true, message: 'Please input your username!' }]}>
                        <Input ref={username} size="large" prefix={<FaUser />} placeholder="Username" />
                    </Form.Item>
                    <Form.Item name="password" rules={[{ required: true, message: 'Please input your password!' }]}>
                        <Input.Password
                            ref={password}
                            size="large"
                            prefix={<RiLockPasswordFill />}
                            placeholder="Password"
                        />
                    </Form.Item>
                    <Form.Item
                        dependencies={['password']}
                        hasFeedback
                        name="confirmPassword"
                        rules={[
                            {
                                required: true,
                                message: 'Please confirm your password!',
                            },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue('password') === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(
                                        new Error('The two passwords that you entered do not match!'),
                                    );
                                },
                            }),
                        ]}
                    >
                        <Input.Password size="large" prefix={<RiLockPasswordFill />} placeholder="Confirm Pasword" />
                    </Form.Item>
                    <Form.Item>
                        <Button className="w-[400px] rounded-md" type="primary" htmlType="submit">
                            Create
                        </Button>
                    </Form.Item>
                    <Form.Item>
                        <Button
                            onClick={() => router.push('/auth/signin')}
                            className="w-[400px] rounded-md"
                            type="secondary"
                        >
                            Go back
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
};

export default signup;
