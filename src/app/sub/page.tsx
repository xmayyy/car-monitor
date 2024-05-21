'use client';
import { useEffect, useLayoutEffect } from 'react';
import subCSS from './index.module.css';
export default function Camara() {
	// useLayoutEffect(()=>{
	// const width = 380;
	// const height = 300;
	// const video = document.getElementById('video');

	// //访问摄像头
	// if (
	// 	navigator.mediaDevices.getUserMedia ||
	// 	navigator.getUserMedia ||
	// 	navigator.webkitGetUserMedia ||
	// 	navigator.mozGetUserMedia
	// ) {
	// 	//调用用户媒体设备, 访问摄像头
	// 	getUserMedia({ video: { width: width, height: height } }, success, error);
	// } else {
	// 	alert('不支持访问用户媒体');
	// }

	// //访问用户媒体设备的兼容方法
	// function getUserMedia(constraints, success, error) {
	// 	if (navigator.mediaDevices.getUserMedia) {
	// 		//最新的标准API
	// 		navigator.mediaDevices
	// 			.getUserMedia(constraints)
	// 			.then(success)
	// 			.catch(error);
	// 	} else if (navigator.webkitGetUserMedia) {
	// 		//webkit核心浏览器
	// 		navigator.webkitGetUserMedia(constraints, success, error);
	// 	} else if (navigator.mozGetUserMedia) {
	// 		//firfox浏览器
	// 		navigator.mozGetUserMedia(constraints, success, error);
	// 	} else if (navigator.getUserMedia) {
	// 		//旧版API
	// 		navigator.getUserMedia(constraints, success, error);
	// 	}
	// }

	// //成功回调
	// function success(stream) {
	// 	console.log('成功');
	// 	//兼容webkit核心浏览器
	// 	// const CompatibleURL = window.URL || window.webkitURL;
	// 	//将视频流设置为video元素的源
	// 	// video.src = CompatibleURL.createObjectURL(stream);
	// 	video.srcObject = stream;
	// 	video.play();
	// 	setInterval(drawCanvasImage, 1000);
	// }

	// //失败回调
	// function error(error) {
	// 	console.log('失败');
	// 	console.log('访问用户媒体设备失败', error);
	// }

	// function drawCanvasImage() {
	// 	const canvas = document.getElementById('canvas');
	// 	canvas.width = width;
	// 	canvas.height = height;
	// 	const context = canvas.getContext('2d');
	// 	context.drawImage(video, 0, 0, width, height, 0, 0, width, height);
	// 	//获取图片，数据格式为base64
	// 	const imageData = canvas.toDataURL('image/png');
	// 	console.log(imageData);
	// }
	// })
	return (
		<div style={{backgroundColor:'#fffff',height:'800px'}}>
			<img width='380px' height='300px' src="https://img2.imgtp.com/2024/04/29/E2VTe8LM.png" alt="" />
			<img width='380px' height='300px' src="https://img2.imgtp.com/2024/04/29/Ky1okT9H.png"  />
			<video id="video"></video>
			<canvas id="canvas"></canvas>
			<div className={subCSS.alert}>疲劳告警</div>
		</div>
	);
}
