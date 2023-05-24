import { Button, Checkbox, Form, Input } from 'antd';

import { AiOutlineMail } from 'react-icons/ai';
import { RiLockPasswordFill } from 'react-icons/ri';
import { BsFacebook } from 'react-icons/bs';
import { FcGoogle } from 'react-icons/fc';
import Link from 'next/link';

const signin = () => {
    return (
        <div className="w-screen h-screen bg-aspagarus flex justify-center items-center">
            <div className="w-[520px] h-[600px] bg-white rounded-md drop-shadow-2xl ">
                <h2 className="mx-auto w-fit my-16 text-4xl">Login Account</h2>
                <Form className="w-[400px] mx-auto" name="login" autoComplete="off">
                    <Form.Item rules={[{ required: true, message: 'Please input your username!' }]}>
                        <Input size="large" prefix={<AiOutlineMail />} placeholder="Email" />
                    </Form.Item>
                    <Form.Item rules={[{ required: true, message: 'Please input your username!' }]}>
                        <Input.Password size="large" prefix={<RiLockPasswordFill />} placeholder="Password" />
                    </Form.Item>
                    <Form.Item name="remember" valuePropName="checked">
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
