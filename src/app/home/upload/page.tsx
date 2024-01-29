'use client';
import { useEffect, useState } from 'react';
import { Button } from 'antd';
import styles from '../page.module.css';
import uploadCSS from './upload.module.css';
import { InboxOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd';
import { message, Upload, Layout } from 'antd';
import { getAccessToken,uploadImg } from '../../api/upload';
import { useRouter } from 'next/navigation';
import cookie from 'js-cookie';
import { devNull } from 'os';
const { Header, Content, Footer, Sider } = Layout;
const { Dragger } = Upload;

const props: UploadProps = {
	name: 'file',
	multiple: true,
	action: 'http://localhost:3002/upload/uploadImg',
	data: (file) => {
		console.log(file);
		return { image: file };
	},
	/**
	获取file，通过FileReader获取图片的 base64
*/
	customRequest(option) {
		const formData = new FormData();
		formData.append('files[]', option.file);
		const reader = new FileReader();
		reader.readAsDataURL(option.file as Blob);
		reader.onloadend = function (e) {
			console.log(e.target!.result); // 打印图片的base64
			if (e && e.target && e.target.result) {
				uploadImg({image:e.target!.result,access_token:cookie.get('access_token')})
				option.onSuccess!({});
			}
		};
	},
	onChange(info) {
		console.log('info', info);
		console.log('info.file', info.file);
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
export default function UploadPage() {
	useEffect(() => {
		const getAccessTokenNow = async () => {
			const accessToken = await getAccessToken();
			console.log('accessToken', accessToken);
		};
		getAccessTokenNow();
	});
	return (
		<div className={uploadCSS.main}>
			<Dragger {...props}>
				<p className="ant-upload-drag-icon">
					<InboxOutlined />
				</p>
				<p className="ant-upload-text">
					Click or drag file to this area to upload
				</p>
				<p className="ant-upload-hint">
					Support for a single or bulk upload. Strictly prohibited from
					uploading company data or other banned files.
				</p>
			</Dragger>
		</div>
	);
}
