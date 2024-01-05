'use client'
import { useState } from 'react';
import { Button } from 'antd';
import styles from '../page.module.css'
import homeCSS from './home.module.css'
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Breadcrumb, Layout, Menu, theme } from 'antd';

const { Header, Content, Footer, Sider } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem('Option 1', '1', <PieChartOutlined />),
  getItem('Option 2', '2', <DesktopOutlined />),
  getItem('User', 'sub1', <UserOutlined />, [
    getItem('Tom', '3'),
    getItem('Bill', '4'),
    getItem('Alex', '5'),
  ]),
  getItem('Team', 'sub2', <TeamOutlined />, [getItem('Team 1', '6'), getItem('Team 2', '8')]),
  getItem('Files', '9', <FileOutlined />),
];
export default function Home() {
	const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
	return (
		<div className={homeCSS.main}>
			<Layout style={{ minHeight: '100vh' }}>
      	<Sider theme="light" collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
      	  {/* <div className="demo-logo-vertical" /> */}
      	  <Menu theme="light" defaultSelectedKeys={['1']} mode="inline" items={items} />
      	</Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }} ><h1 className={homeCSS.title}>饕餮监控系统</h1></Header>
        <Content style={{ margin: '0 16px' }}>
          <Breadcrumb style={{ margin: '16px 0' }} items={[{title:'首页'},{title:'结果分析'}]}>
          </Breadcrumb>
          <div style={{ padding: 24, minHeight: 360, background: colorBgContainer }}>
            Bill is a cat.
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Ant Design ©2023 Created by Ant UED</Footer>
      </Layout>
    </Layout>
		</div>
	);
}
