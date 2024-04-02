'use client';
import { ReactNode, useEffect, useState } from 'react';
import styles from '../page.module.css';
import homeCSS from './home.module.css';
import {
	DesktopOutlined,
	FileOutlined,
	PieChartOutlined,
	TeamOutlined,
	UserOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { App ,Breadcrumb, Layout, Menu, theme, message, Flex } from 'antd';
import { useRouter } from 'next/navigation';
import cookie from 'js-cookie';
// api
import { checkLogin } from '../api/user';
import { devNull } from 'os';
const { Header, Content, Footer, Sider } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
	label: React.ReactNode,
	key: React.Key,
	icon?: React.ReactNode,
	children?: MenuItem[]
): MenuItem {
	return {
		key,
		icon,
		children,
		label,
	} as MenuItem;
}

const items: MenuItem[] = [
	getItem('图片上传', '/upload', <FileOutlined />),
	getItem('分析数据', '/analytics', <DesktopOutlined />),
	getItem('人员管理', '/manage', <UserOutlined />),
	getItem('Team', 'sub2', <TeamOutlined />, [
		getItem('Team 1', '6'),
		getItem('Team 2', '8'),
	]),
	getItem('Files', '9', <PieChartOutlined />),
];
interface MyComponentProps {
	children: ReactNode;
}

export default function Home({ children }: MyComponentProps) {
	const router = useRouter();
	const [messageApi, contextHolder] = message.useMessage();
	const [username, setUsername] = useState('');
	const [collapsed, setCollapsed] = useState(false);
	const {
		token: { colorBgContainer },
	} = theme.useToken();
	useEffect(() => {
		checkLoginFirst();
	}, []);

	// 选中导航菜单
	const clickMenu = function (e: any) {
		console.log('item', e);
		router.push('/home' + e.key);
	};
	// 检查登录状态
	async function checkLoginFirst() {
		const res = await checkLogin();
		const { success, info } = res;
		if (success) {
			messageApi.info(info);
			refreshUserName();
		} else {
			messageApi.error(info);
			// 跳转登录
			router.push('/login');
		}
	}
	function refreshUserName() {
		const username = Boolean(cookie.get('USER_ID'))
			? cookie.get('USER_ID')
			: '';
		setUsername(username as string);
	}
	// 退出登录
	const logout = function () {
		cookie.remove('JWT');
		cookie.remove('USER_ID');
		router.push('/login');
	};
	return (
		<App>
			<div className={homeCSS.main}>
			{contextHolder}
			<Layout style={{ minHeight: '100vh' }}>
				<Sider
					theme="light"
					collapsible
					collapsed={collapsed}
					onCollapse={(value) => setCollapsed(value)}
				>
					{/* <div className="demo-logo-vertical" /> */}
					<Menu
						theme="light"
						defaultSelectedKeys={['1']}
						mode="inline"
						items={items}
						onClick={(e) => clickMenu(e)}
					/>
				</Sider>
				<Layout>
					<Header style={{ padding: 0, background: colorBgContainer }}>
						<Flex justify="space-between">
							<h1 className={homeCSS.title}>驾驶行为监控系统</h1>
							{username ? (
								<Flex>
									<span className={homeCSS.user}>{username}</span>
									<span className={homeCSS.logout} onClick={logout}>
										退出登录
									</span>
								</Flex>
							) : null}
						</Flex>
					</Header>
					<Content style={{ margin: '0 16px' }}>
						<Breadcrumb
							style={{ margin: '16px 0' }}
							items={[{ title: '首页' }, { title: '' }]}
						></Breadcrumb>
						<div
							style={{
								padding: 24,
								minHeight: 480,
								background: colorBgContainer,
							}}
						>
							{children}
						</div>
					</Content>
					<Footer style={{ textAlign: 'center' }}></Footer>
				</Layout>
			</Layout>
		</div>
		</App>
	);
}
