import { getAxios, postAxios } from '@/utils/axios';
const getAccessTokenUrl = '/upload/getAccessToken';
const uploadImgUrl = '/upload/uploadImg';
export const getAccessToken = (data) => {
	return postAxios({ url: getAccessTokenUrl, data });
};
export const uploadImg = (data) => {
	return postAxios({ url: uploadImgUrl, data });
};
