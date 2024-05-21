'use client';
import { useEffect, useState } from 'react';
import { Button } from 'antd';
import styles from '../page.module.css';
import uploadCSS from './upload.module.css';
import { InboxOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd';
import { message, Upload, Layout, Steps, Form, Select, Input } from 'antd';
import { getAccessToken, uploadImg } from '../../api/upload';
import { useRouter } from 'next/navigation';
import cookie from 'js-cookie';
import { devNull } from 'os';
import { getGroupList } from '@/app/api/group';
import { getPeopleList } from '@/app/api/people';
const { Option } = Select;
const { Header, Content, Footer, Sider } = Layout;
const { Dragger } = Upload;

export default function UploadPage() {
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
					uploadImg({
						image: e.target!.result,
						access_token: cookie.get('access_token'),
						people_id,
					});
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
				// message.success(`${info.file.name} file uploaded successfully.`);
				message.success('图片上传成功，请前往分析数据查看');
				onNextStep('');
			} else if (status === 'error') {
				message.error(`${info.file.name} file upload failed.`);
			}
		},
		onDrop(e) {
			console.log('Dropped files', e.dataTransfer.files);
		},
	};
	const [setp, setStep] = useState(0);
	const [form] = Form.useForm();
	const onNextStep = (data: any) => {
		setStep((setp) => setp + 1);
		console.log('data', data);
	};
	const onNextStepFailed = () => {};
	const [groupList, setGroupList] = useState([]);
	const [peopleList, setpeopleList] = useState([]);
	const [people_id, setpeopleId] = useState(0);
	async function getList() {
		const res = await getGroupList({ id: cookie.get('USER_ID') });
		setGroupList(res.data);
		console.log('setGroupListres', res);
	}
	async function getPeoples(data: any) {
		const res = await getPeopleList(data);
		setpeopleList(res.data);
		console.log('getPeoplesres', res.data);
	}
	useEffect(() => {
		const getAccessTokenNow = async () => {
			const accessToken = await getAccessToken();
			console.log('accessToken', accessToken);
		};
		getAccessTokenNow();
	});
	useEffect(() => {
		getList();
	}, []);
	const onGroupChange = (group_id: number) => {
		console.log('onGroupChange', group_id);
		getPeoples({ group_id });
	};
	const onPeopleChange = (people_id: number) => {
		setpeopleId(people_id);
		console.log('onPeopleChange');
	};
	return (
		<div className={uploadCSS.main}>
			<Steps
				current={setp}
				items={[
					{
						title: '第一步',
						description: '输入人员信息',
					},
					{
						title: '第二步',
						description: '上传图片',
					},
					{
						title: '第三步',
						description: '智能驾驶行为分析',
					},
				]}
			/>
			{setp === 0 ? (
				<div id="basic" className={uploadCSS.basic}>
					<Form
						className={uploadCSS.form}
						form={form}
						name="basic"
						labelCol={{ span: 8 }}
						wrapperCol={{ span: 16 }}
						style={{ maxWidth: 600 }}
						initialValues={{ remember: true }}
						onFinish={onNextStep}
						onFinishFailed={onNextStepFailed}
						autoComplete="off"
					>
						<Form.Item
							label="小组名称"
							name="group_id"
							rules={[
								{ required: true, message: 'Please input your username!' },
							]}
						>
							<Select
								placeholder="选择您管理的小组"
								onChange={onGroupChange}
								allowClear
							>
								{groupList.map((group: any) => {
									return (
										<Option key={group.group_id} value={group.group_id}>
											{group.group_Name}
										</Option>
									);
								})}
							</Select>
						</Form.Item>
						<Form.Item
							label="人员名称"
							name="people_id"
							rules={[
								{ required: true, message: 'Please input your username!' },
							]}
						>
							<Select
								placeholder="选择小组成员"
								onChange={onPeopleChange}
								allowClear
							>
								{peopleList.map((people: any) => {
									return (
										<Option key={people.people_id} value={people.people_id}>
											{people.name}
										</Option>
									);
								})}
							</Select>
						</Form.Item>
						<Form.Item label="检测时间" name="detect_date">
							<Input />
						</Form.Item>
						<Form.Item wrapperCol={{ offset: 14, span: 16 }}>
							<Button type="primary" htmlType="submit">
								下一步
							</Button>
						</Form.Item>
					</Form>
				</div>
			) : null}
			{setp === 1 ? (
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
			) : null}
			{setp === 2 ? <Button type="primary">跳转检测结果</Button> : null}
		</div>
	);
}
