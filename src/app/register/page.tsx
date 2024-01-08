'use client';

import styles from '../page.module.css';
import loginCSS from './login.module.css';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input,Flex,message } from 'antd';
import { useRouter } from 'next/navigation';
import { register } from '../api/user';
export default function Register() {
	const [messageApi, contextHolder] = message.useMessage();
	const router = useRouter();
	const onFinish = async (values: any) => {
		console.log('Received values of form: ', values);
		const res = await register(values)
			messageApi.info('注册成功');
			console.log('res',res)
		router.push('/login');
	};
	return (
		<div className={loginCSS.main}>
			<div className={loginCSS.card}>
				<h1 className={styles.center}>注册</h1>
				<Form
					name="normal_login"
					className="login-form"
					initialValues={{ remember: true }}
					onFinish={onFinish}
				>
					<Form.Item
						name="username"
						rules={[{ required: true, message: 'Please input your Username!' }]}
					>
						<Input
							prefix={<UserOutlined className="site-form-item-icon" />}
							placeholder="Username"
						/>
					</Form.Item>
					<Form.Item
						name="password"
						rules={[{ required: true, message: 'Please input your Password!' }]}
					>
						<Input
							prefix={<LockOutlined className="site-form-item-icon" />}
							type="password"
							placeholder="Password"
						/>
					</Form.Item>
					{/* <Form.Item>
						<Form.Item name="remember" valuePropName="checked" noStyle>
							<Checkbox>Remember me</Checkbox>
						</Form.Item>

						<a className="login-form-forgot" href="">
							Forgot password
						</a>
					</Form.Item> */}

					<Form.Item>
						<Flex justify='space-between'>
							<Button
								type="primary"
								htmlType="submit"
								className="login-form-button"
							>
								Register
							</Button>
						</Flex>
					</Form.Item>
				</Form>
			</div>
		</div>
	);
}
