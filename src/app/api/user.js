import { getAxios, postAxios } from '@/utils/axios';
const registerUrl = '/auth/register';
const loginUrl = '/auth/login';
const checkLoginUrl = '/auth/checkLogin';

export const register = (data) => {
	return postAxios({ url: registerUrl, data });
};
export const login = (data) => {
	return postAxios({ url: loginUrl, data });
};
export const checkLogin = () => {
  return getAxios({ url: checkLoginUrl});
};
