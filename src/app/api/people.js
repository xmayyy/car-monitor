import { getAxios, postAxios } from '@/utils/axios';
const addPeopleUrl = '/people/addPeople';
const deletePeopleUrl = '/people/deletePeople';
const updatePeopleUrl = '/people/updatePeople';
const getPeopleListUrl = '/people/getPeopleList';
export const addPeople = (data) => {
	return postAxios({ url: addPeopleUrl, data });
};
export const deletePeople = (data) => {
	return postAxios({ url: deletePeopleUrl, data });
};
export const updatePeople = (data) => {
	return postAxios({ url: updatePeopleUrl, data });
};
export const getPeopleList = (data) => {
	console.log('getPeopleListdata', data);
	return getAxios({ url: getPeopleListUrl, params: data });
};
