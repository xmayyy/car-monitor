'use client';

import styles from '../page.module.css';
import loginCSS from './login.module.css';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input,Flex } from 'antd';
import { useRouter } from 'next/navigation';

export default function Login() {
	const router = useRouter();
	const onFinish = (values: any) => {
		console.log('Received values of form: ', values);
		setTimeout(() => {
			console.log('登录')
		}, 500);
	};
	const onRegister = (e:any) =>{
		e.preventDefault()
		router.push('/register')
	}
	return (
		<div className={loginCSS.main}>
			<div className={loginCSS.card}>
				<h1 className={styles.center}>登录</h1>
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
								Log in
							</Button>
							<div>Or</div> <a onClick={(e)=>onRegister(e)}>register now!</a>
						</Flex>
					</Form.Item>
				</Form>
			</div>
		</div>
	);
}
