'use client';
import { useEffect, useState } from 'react';
import { Button } from 'antd';
import styles from '../page.module.css';
import analyticsCSS from './analytics.module.css';
import { InboxOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd';
import { message, Upload, Layout } from 'antd';
import { useRouter } from 'next/navigation';
import cookie from 'js-cookie';
import { devNull } from 'os';
const { Header, Content, Footer, Sider } = Layout;
const { Dragger } = Upload;
const props: UploadProps = {
	name: 'file',
	multiple: true,
	action: 'https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188',
	onChange(info) {
		const { status } = info.file;
		if (status !== 'uploading') {
			console.log(info.file, info.fileList);
		}
		if (status === 'done') {
			message.success(`${info.file.name} file uploaded successfully.`);
		} else if (status === 'error') {
			message.error(`${info.file.name} file upload failed.`);
		}
	},
	onDrop(e) {
		console.log('Dropped files', e.dataTransfer.files);
	},
};
export default function Analytics() {
	return (
		<div className={analyticsCSS.main}>
			analyticsCSS
		</div>
	);
}
