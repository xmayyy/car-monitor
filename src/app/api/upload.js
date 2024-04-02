import { getAxios, postAxios } from '@/utils/axios';
const getAccessTokenUrl = '/upload/getAccessToken';
const uploadImgUrl = '/upload/uploadImg';
const getListUrl = '/upload/getList'
const deleteOneIdUrl = '/upload/deleteOneId'
export const getAccessToken = (data) => {
	return postAxios({ url: getAccessTokenUrl, data });
};
export const uploadImg = (data) => {
	return postAxios({ url: uploadImgUrl, data });
};
export const getList = (data) =>{
	return getAxios({url:getListUrl})
}
export const deleteOneId = (data) =>{
	return postAxios({url:deleteOneIdUrl,data})
}