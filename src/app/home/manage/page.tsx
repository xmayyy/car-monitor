'use client';
import React, { use, useEffect, useState, useRef } from 'react';
import styles from '../page.module.css';
import manageCSS from './manage.module.css';
import { InboxOutlined, SearchOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd';
import { useRouter } from 'next/navigation';
import cookie from 'js-cookie';
import { devNull } from 'os';
import {} from '@ant-design/icons';
import type { GetRef, TableColumnsType, TableColumnType } from 'antd';
import type { FilterDropdownProps } from 'antd/es/table/interface';
import Highlighter from 'react-highlight-words';
import {
	Button,
	App,
	Table,
	Space,
	Card,
	Modal,
	Form,
	Input,
	Checkbox,
	message,
	Upload,
	Layout,
	Tag,
} from 'antd';
import type { TableColumnsType, TableProps, FormProps } from 'antd';
import { deleteOneId, getList } from '@/app/api/upload';
import { DetailTable } from './detail';
// 接口
import {
	addGroup,
	getGroupList,
	updateGroup,
	deleteGroup,
} from '@/app/api/group';
import {
	addPeople,
	getPeopleList,
	updatePeople,
	deletePeople,
} from '@/app/api/people';
import { EditOutlined, CloseCircleOutlined } from '@ant-design/icons';

type GruopType = {
	groupId?: number;
	groupName?: string;
	groupOwnerName?: string;
	groupOwnerPhoneNumber?: string;
	groupDec?: string;
	id?: string;
};
type Group = {
	group_id: number;
	group_Name: string;
	group_owner_name: string;
	group_owner_phone_number: string;
	group_dec: string;
	id: any;
};
type InputRef = GetRef<typeof Input>;
interface PeopleDataType {
	name: string;
	people_id: number;
	phone_number: string;
	sex: string;
	birthdate: string;
	group_id?: string;
}

const peopleData: PeopleDataType[] = [
	{
		people_id: 1,
		name: 'John Brown',
		birthdate: '2001-11-30',
		phone_number: '13213213213',
		sex: '男',
	},
	{
		people_id: 2,
		name: 'John Brown',
		birthdate: '2001-11-30',
		phone_number: '032131231',
		sex: '男',
	},
];
type DataIndex = keyof PeopleDataType;
export default function Analytics() {
	const [searchText, setSearchText] = useState('');
	const [searchedColumn, setSearchedColumn] = useState('');
	const searchInput = useRef<InputRef>(null);

	const handleSearch = (
		selectedKeys: string[],
		confirm: FilterDropdownProps['confirm'],
		dataIndex: DataIndex
	) => {
		confirm();
		setSearchText(selectedKeys[0]);
		setSearchedColumn(dataIndex);
	};

	const handleReset = (clearFilters: () => void) => {
		clearFilters();
		setSearchText('');
	};
	const getColumnSearchProps = (
		dataIndex: DataIndex
	): TableColumnType<PeopleDataType> => ({
		filterDropdown: ({
			setSelectedKeys,
			selectedKeys,
			confirm,
			clearFilters,
			close,
		}) => (
			<div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
				<Input
					ref={searchInput}
					placeholder={`Search ${dataIndex}`}
					value={selectedKeys[0]}
					onChange={(e) =>
						setSelectedKeys(e.target.value ? [e.target.value] : [])
					}
					onPressEnter={() =>
						handleSearch(selectedKeys as string[], confirm, dataIndex)
					}
					style={{ marginBottom: 8, display: 'block' }}
				/>
				<Space>
					<Button
						type="primary"
						onClick={() =>
							handleSearch(selectedKeys as string[], confirm, dataIndex)
						}
						icon={<SearchOutlined />}
						size="small"
						style={{ width: 90 }}
					>
						搜索
					</Button>
					<Button
						onClick={() => clearFilters && handleReset(clearFilters)}
						size="small"
						style={{ width: 90 }}
					>
						重置
					</Button>
					<Button
						type="link"
						size="small"
						onClick={() => {
							confirm({ closeDropdown: false });
							setSearchText((selectedKeys as string[])[0]);
							setSearchedColumn(dataIndex);
						}}
					>
						筛选
					</Button>
					<Button
						type="link"
						size="small"
						onClick={() => {
							close();
						}}
					>
						关闭
					</Button>
				</Space>
			</div>
		),
		filterIcon: (filtered: boolean) => (
			<SearchOutlined style={{ color: filtered ? '#1677ff' : undefined }} />
		),
		onFilter: (value, record: any) =>
			record[dataIndex]
				.toString()
				.toLowerCase()
				.includes((value as string).toLowerCase()),
		onFilterDropdownOpenChange: (visible) => {
			if (visible) {
				setTimeout(() => searchInput.current?.select(), 100);
			}
		},
		render: (text) =>
			searchedColumn === dataIndex ? (
				<Highlighter
					highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
					searchWords={[searchText]}
					autoEscape
					textToHighlight={text ? text.toString() : ''}
				/>
			) : (
				text
			),
	});
	const columns: TableProps<PeopleDataType>['columns'] = [
		{
			title: '姓名',
			dataIndex: 'name',
			key: 'name',
			...getColumnSearchProps('name'),
		},
		{
			title: '出生年月',
			dataIndex: 'birthdate',
			key: 'birthdate',
		},
		{
			title: '电话号码',
			dataIndex: 'phone_number',
			key: 'phone_number',
		},
		{
			title: '性别',
			key: 'sex',
			dataIndex: 'sex',
		},
		{
			title: '操作',
			key: 'people_id',
			render: (_, record) => (
				<Space size="middle">
					<a
						onClick={(e) => {
							openPeopleForm(_);
						}}
					>
						编辑
					</a>
					<a
						onClick={(e) => {
							async function handleDeletePeople() {
								const res = await deletePeople(_);
								if (res.code === 200) {
									getPeoples({ group_id: nowGroupId });
									message.info('删除成功');
								}
							}
							handleDeletePeople();
						}}
					>
						删除
					</a>
				</Space>
			),
		},
	];
	const [form] = Form.useForm();
	const [isAddGroupModalOpen, setIsAddGroupModalOpen] = useState(false);
	const [title, setTitle] = useState('');
	const [peopleTitle, setPeopleTitle] = useState('');
	const { message } = App.useApp();
	const openGroupForm = (group: null | Group = null) => {
		setIsAddGroupModalOpen(true);
		if (group) {
			console.log('group', group);
			form.setFieldsValue({
				groupName: group.group_Name,
				groupOwnerName: group.group_owner_name,
				groupOwnerPhoneNumber: group.group_owner_phone_number,
				groupDec: group.group_dec,
				groupId: group.group_id,
			});
			setTitle('修改小组');
		} else {
			form.resetFields();
			setTitle('新增小组');
		}
	};
	const onAddGroup = async (data: GruopType) => {
		console.log('onAddGroup', data);
		data = { ...data, id: cookie.get('USER_ID') };
		if (data.groupId) {
			// 修改
			console.log('data', data);
			const res = await updateGroup(data);
			if (res.code === 200) {
				message.success(res.data);
				getList();
			} else {
				message.error('更新失败');
			}
			console.log('updateGroup', res);
		} else {
			// 添加
			const res = await addGroup(data);
			getList();
			console.log('addGroup', res);
		}
		setIsAddGroupModalOpen(false);
	};
	const onAddGroupFailed = () => {
		console.log('添加小组失败');
	};
	const confirmAddGroup = (data: GruopType) => {
		console.log('confirmAddGroup', data);
	};
	const handleCancel = () => {
		setIsAddGroupModalOpen(false);
	};
	// 获取小组列表
	const [groupList, setGroupList] = useState([]);

	async function getList() {
		const res = await getGroupList({ id: cookie.get('USER_ID') });
		setNowGroupId(res.data[0].group_id || 0);
		console.log('res', res);
		setGroupList(res.data);
		getPeoples({ group_id: nowGroupId });
	}

	const [peplesData, setPeoplesData] = useState(null);
	async function getPeoples(data: any) {
		const res = await getPeopleList(data);
		console.log('getPeoplesres', res.data);
		setPeoplesData(res.data);
	}
	useEffect(() => {
		getList();
	}, []);
	// 修改小组
	const changeGroup = (group) => {};
	const [initValues, setInitValues] = useState({});

	// 删除小组
	const deleteGroupClick = async (groupId: number) => {
		const res = await deleteGroup({ groupId });
		if (res.code === 200) {
			message.success(res.data);
			getList();
		} else {
			message.error('更新失败');
		}
	};

	// 新增人员弹框
	const [isAddPeopleModalOpen, setisAddPeopleModalOpen] = useState(false);
	const openPeopleForm = (people: null | PeopleDataType = null) => {
		setisAddPeopleModalOpen(true);
		console.log('people', people);

		if (people) {
			console.log('people', people);
			const { name, birthdate, phone_number, sex, people_id } = people;
			form.setFieldsValue({ name, birthdate, phone_number, sex, people_id });
			setPeopleTitle('修改人员');
		} else {
			form.resetFields();
			setPeopleTitle('新增人员');
		}
	};
	const onAddPeople = async (data: PeopleDataType) => {
		console.log('onAddPeople', data);
		data = { ...data, group_id: '' + nowGroupId };
		if (data.people_id) {
			// 修改
			console.log('updatePeopledata', data);
			const res = await updatePeople(data);
			if (res.code === 200) {
				message.success(res.data);
			} else {
				message.error('更新失败');
			}
			console.log('updatePeople', res);
		} else {
			// 添加
			const res = await addPeople(data);
			message.success('添加成功');
			console.log('addPeople', res);
		}
		setisAddPeopleModalOpen(false);
		getPeoples({ group_id: nowGroupId });
	};
	const onAddPeopleFailed = () => {
		console.log('添加人员失败');
	};
	// 关闭人员弹框
	const handleCancelHuman = () => {
		setisAddPeopleModalOpen(false);
	};
	const [nowGroupId, setNowGroupId] = useState(0);
	const chooseGroup = (group_id: any) => {
		setNowGroupId(group_id);
	};

	useEffect(() => {
		getPeoples({ group_id: nowGroupId });
	}, [nowGroupId]);
	return (
		<div className={manageCSS.main}>
			<div className={manageCSS.content}>
				<div className={manageCSS.left}>
					<div className={manageCSS.head}>
						<h2 className={manageCSS.title}>小组列表</h2>
						<div
							style={{
								textAlign: 'center',
								display: 'flex',
								alignItems: 'center',
							}}
						>
							<Button
								type="primary"
								size="small"
								onClick={(e) => {
									openGroupForm();
								}}
							>
								新增小组
							</Button>
						</div>
					</div>
					<div className={manageCSS.list}>
						{groupList.map((group: Group) => {
							return (
								<div
									className={`${manageCSS.listItem} ${
										nowGroupId === group.group_id ? manageCSS.light : ''
									}`}
									key={group.group_id}
									onClick={(e) => chooseGroup(group.group_id)}
								>
									<div className={manageCSS.groupContent}>
										<div className={manageCSS.groupName}>
											{group.group_Name}
										</div>
										<div className={manageCSS.oparation}>
											<Button
												size="small"
												style={{ marginRight: '10px' }}
												type="primary"
												icon={<EditOutlined />}
												onClick={(e) => {
													openGroupForm(group);
												}}
											>
												修改
											</Button>
											<Button
												size="small"
												type="primary"
												icon={<CloseCircleOutlined />}
												onClick={(e) => {
													deleteGroupClick(group.group_id);
												}}
												danger
											>
												删除
											</Button>
										</div>
									</div>
								</div>
							);
						})}
					</div>
				</div>
				<div className={manageCSS.right}>
					<div className={manageCSS.head}>
						<h2 className={manageCSS.title}>人员列表</h2>
						<div
							style={{
								textAlign: 'center',
								display: 'flex',
								alignItems: 'center',
							}}
						>
							<Button
								type="primary"
								size="small"
								onClick={(e) => {
									openPeopleForm();
								}}
							>
								新增人员
							</Button>
						</div>
					</div>
					<div className={manageCSS.list}>
						<Table
							columns={columns}
							dataSource={peplesData}
							scroll={{ x: 500, y: 300 }}
							rowKey="people_id"
						/>
					</div>
				</div>
			</div>
			<Modal
				title={title}
				open={isAddGroupModalOpen}
				footer={null}
				onCancel={handleCancel}
			>
				<Form
					form={form}
					name="basic"
					labelCol={{ span: 8 }}
					wrapperCol={{ span: 16 }}
					style={{ maxWidth: 600 }}
					initialValues={{ ...initValues, remember: true }}
					onFinish={onAddGroup}
					onFinishFailed={onAddGroupFailed}
					autoComplete="off"
				>
					<Form.Item<GruopType>
						label="小组编号"
						name="groupId"
						rules={[
							{ required: false, message: 'Please input your username!' },
						]}
						hidden
					>
						<Input />
					</Form.Item>

					<Form.Item<GruopType>
						label="小组名称"
						name="groupName"
						rules={[{ required: true, message: 'Please input your username!' }]}
					>
						<Input />
					</Form.Item>

					<Form.Item<GruopType>
						label="小组负责人名称"
						name="groupOwnerName"
						rules={[{ required: true, message: 'Please input your password!' }]}
					>
						<Input />
					</Form.Item>

					<Form.Item<GruopType>
						label="小组负责人电话"
						name="groupOwnerPhoneNumber"
						rules={[{ required: true, message: 'Please input your password!' }]}
					>
						<Input />
					</Form.Item>

					<Form.Item<GruopType>
						label="小组描述"
						name="groupDec"
						rules={[
							{ required: false, message: 'Please input your password!' },
						]}
					>
						<Input />
					</Form.Item>

					<Form.Item wrapperCol={{ offset: 8, span: 16 }}>
						<Button type="primary" htmlType="submit">
							{title.substring(0, 2)}
						</Button>
					</Form.Item>
				</Form>
			</Modal>
			<Modal
				title={peopleTitle}
				open={isAddPeopleModalOpen}
				footer={null}
				onCancel={handleCancelHuman}
			>
				<Form
					form={form}
					name="people"
					labelCol={{ span: 8 }}
					wrapperCol={{ span: 16 }}
					style={{ maxWidth: 600 }}
					initialValues={{ ...initValues, remember: true }}
					onFinish={onAddPeople}
					onFinishFailed={onAddGroupFailed}
					autoComplete="off"
				>
					<Form.Item<PeopleDataType>
						label="人员编号"
						name="people_id"
						rules={[
							{ required: false, message: 'Please input your username!' },
						]}
						hidden
					>
						<Input />
					</Form.Item>

					<Form.Item<PeopleDataType>
						label="姓名"
						name="name"
						rules={[{ required: true, message: 'Please input your username!' }]}
					>
						<Input />
					</Form.Item>

					<Form.Item<PeopleDataType>
						label="出生年月"
						name="birthdate"
						rules={[{ required: true, message: 'Please input your password!' }]}
					>
						<Input />
					</Form.Item>

					<Form.Item<PeopleDataType>
						label="电话号码"
						name="phone_number"
						rules={[{ required: true, message: 'Please input your password!' }]}
					>
						<Input />
					</Form.Item>

					<Form.Item<PeopleDataType>
						label="性别"
						name="sex"
						rules={[
							{ required: false, message: 'Please input your password!' },
						]}
					>
						<Input />
					</Form.Item>

					<Form.Item wrapperCol={{ offset: 8, span: 16 }}>
						<Button type="primary" htmlType="submit">
							{peopleTitle.substring(0, 2)}
						</Button>
					</Form.Item>
				</Form>
			</Modal>
			{/* <Table columns={columns} dataSource={imageListFlat} onChange={onChange} /> */}
		</div>
	);
}
