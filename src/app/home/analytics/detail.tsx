import { Table, TableColumnsType } from "antd"
import { useEffect, useState } from "react";
interface DataType {
	person_num: React.Key;
	person_info: any;
	driver_num: number;
	log_id: number;
	image64:string,
	location:any
}

const columns: TableColumnsType<DataType> = [
  {
    title: '记录id',
    dataIndex: 'log_id',
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
];
export function DetailTable({imageListFlat,log_id}:any){
  imageListFlat = imageListFlat.filter((item:any)=>item.log_id === log_id)
  const singleImageListFlat = imageListFlat.map((item:any)=>{
    return {
      log_id:item.log_id,
      smoke:item.smoke > 0.48 ? '是' : '否',
      yawning:item.yawning > 0.5 ? '是' : '否',
      cellphone:item.cellphone > 0.69 ? '是' : '否',
      eyes_closed:item.eyes_closed > 0.55 ? '是' : '否',
      no_face_mask:item.no_face_mask > 0.75 ? '是' : '否',
      not_buckling_up:item.not_buckling_up > 0.44 ? '是' : '否',
      not_facing_front:item.not_facing_front > 0.5 ? '是' : '否',
      both_hands_leaving_wheel:item.both_hands_leaving_wheel > 0.75 ? '是' :'否',
      head_lowered:item.both_hands_leaving_wheel > 0.55 ? '是' : '否'
    }
  })
 
  return <Table columns={columns} dataSource={singleImageListFlat}/>
}