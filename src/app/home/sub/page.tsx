'use client';
import { useEffect } from 'react';
import subCSS from './index.module.css';
export default function Camara() {
	return (
		<div>
			<h3>image图片 - 前置摄像头调用</h3>
			<input type="file" accept="image/*" capture="user"></input>
		</div>
	);
}
