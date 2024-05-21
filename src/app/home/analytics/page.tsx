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
import React from 'react';
import { Table, Space, Card, Modal } from 'antd';
import type { TableColumnsType, TableProps } from 'antd';
import { deleteOneId, getList } from '@/app/api/upload';
import { DetailTable } from './detail';
interface DataType {
	person_num: React.Key;
	person_info: any;
	driver_num: number;
	log_id: number;
	image64:string,
	location:any
}

const onChange: TableProps<DataType>['onChange'] = (
	pagination,
	filters,
	sorter,
	extra
) => {
	console.log('params', pagination, filters, sorter, extra);
};

export default function Analytics() {
	const [imageList, setImageList] = useState([]);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [image64Data,setImage64Data] = useState('')
	const [regLocation,setLocation] = useState<any>(null)
	const [log_id,setlog_id] = useState<number>(0)
	const [messageApi, contextHolder] = message.useMessage();
	const columns: TableColumnsType<DataType> = [
		{
			title: '记录id',
			dataIndex: 'log_id',
		},
		{
			title: '姓名',
			dataIndex: 'name',
		},
		// {
		// 	title: '检测人数',
		// 	dataIndex: 'person_num',
		// 	// filters: [
		// 	// 	{
		// 	// 		text: 'Joe',
		// 	// 		value: 'Joe',
		// 	// 	},
		// 	// 	{
		// 	// 		text: 'Category 1',
		// 	// 		value: 'Category 1',
		// 	// 	},
		// 	// 	{
		// 	// 		text: 'Category 2',
		// 	// 		value: 'Category 2',
		// 	// 	},
		// 	// ],
		// 	// filterMode: 'tree',
		// 	// filterSearch: true,
		// 	// width: '30%',
		// },
		{
			title: '双手离开方向盘',
			dataIndex: 'both_hands_leaving_wheel',
			// sorter: (a, b) => a.age - b.age,
		},
		{
			title: '闭眼',
			dataIndex: 'eyes_closed',
			// filters: [
			// 	{
			// 		text: 'London',
			// 		value: 'London',
			// 	},
			// 	{
			// 		text: 'New York',
			// 		value: 'New York',
			// 	},
			// ],
			// filterSearch: true,
			// width: '40%',
		},
		{
			title: '没有口罩',
			dataIndex: 'no_face_mask',
		},
		{
			title: '未系安全带',
			dataIndex: 'not_buckling_up',
		},
		{
			title: '是否抽烟',
			dataIndex: 'smoke',
		},
		{
			title: '视角未朝前方',
			dataIndex: 'not_facing_front',
		},
		{
			title: '打手机',
			dataIndex: 'cellphone',
		},
		{
			title: '打哈欠',
			dataIndex: 'yawning',
		},
		{
			title: '低头',
			dataIndex: 'head_lowered',
		},
		{
			title: '操作',
			key: 'action',
			render: (_, record) => (
				<Space size="small">
					<a onClick={()=>showModal(record.image64,record.location,record.log_id)}>查看图片</a>
					<a onClick={()=>handleDelete(record.log_id)}>删除</a>
				</Space>
			),
		},
	];
	const imageListFlat = imageList.map((item: any) => {
		if(!item.person_info)return{key:item.log_id}
		console.log('item', item);
		return {
			name:item.name,
			key: item.log_id,
			person_num: item.person_num,
			log_id: item.log_id,
			driver_num: item.driver_num,
			both_hands_leaving_wheel:
				item.person_info[0].attributes.both_hands_leaving_wheel.score.toFixed(
					2
				),
			eyes_closed: item.person_info[0].attributes.eyes_closed.score.toFixed(2),
			no_face_mask:
				item.person_info[0].attributes.no_face_mask.score.toFixed(2),
			not_buckling_up:
				item.person_info[0].attributes.not_buckling_up.score.toFixed(2),
			smoke: item.person_info[0].attributes.smoke.score.toFixed(2),
			not_facing_front:
				item.person_info[0].attributes.not_facing_front.score.toFixed(2),
			cellphone: item.person_info[0].attributes.cellphone.score.toFixed(2),
			yawning: item.person_info[0].attributes.yawning.score.toFixed(2),
			head_lowered:
				item.person_info[0].attributes.head_lowered.score.toFixed(2),
			image64:item.image64,
			location:item.person_info[0].location
		};
	});
	const getImageList = async () => {
		setImageList(await getList());
	};
	useEffect(() => {
		getImageList();
	}, []);
	const showModal = (image64:any,location:any,log_id:number) => {
		// 载入base64
		setLocation(location)
		setImage64Data(image64)
		setlog_id(log_id)
		setIsModalOpen(true);
	};
	const handleCancel = () => {
    setIsModalOpen(false);
  };
	
	// 删除
	const handleDelete = async (log_id:number) => {
		const res = await deleteOneId({log_id:log_id})
		messageApi.info('删除成功');
		getImageList();
	}
	return (
		<div className={analyticsCSS.main}>
			<Table columns={columns} dataSource={imageListFlat} onChange={onChange} />
			<Modal title="检测结果" open={isModalOpen} onCancel={handleCancel} footer={null} width={1000} >
				<div className={analyticsCSS.imgDiv}>
					<picture><img className={analyticsCSS.img}src={image64Data} alt="" /></picture>
					<div className={analyticsCSS.card} style={{top:regLocation?.top,left:regLocation?.left,width:regLocation?.width,height:regLocation?.height}}  >111</div>
					<div>{JSON.stringify(regLocation)}</div>
					<DetailTable imageListFlat={imageListFlat} log_id={log_id}></DetailTable>
				</div>
			</Modal>
		</div>
	);
}
