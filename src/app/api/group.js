import { getAxios, postAxios } from '@/utils/axios';
const getListUrl = '/group/addGroup';
const deleteGroupUrl = '/group/deleteGroup';
const updateGroupUrl = '/group/updateGroup';
const getGroupListUrl = '/group/getGroupList';
export const addGroup = (data) => {
	return postAxios({ url: getListUrl, data });
};
export const deleteGroup = (data) => {
	return postAxios({ url: deleteGroupUrl, data });
};
export const updateGroup = (data) => {
	return postAxios({ url: updateGroupUrl, data });
};
export const getGroupList = (data) => {
	console.log('data', data);
	return getAxios({ url: getGroupListUrl, params: data });
};
