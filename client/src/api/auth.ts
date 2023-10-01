import { axiosInstance } from './axios';
import { Login, ResetPassword, VerifyAccount } from './types';
import { SignUp } from '../shared/types';

export const postLogin = async (reqBody: Login) => {
  try {
    const { data } = await axiosInstance.post('/account/login', reqBody);
    window.sessionStorage.setItem('userId', data.userId);
    axiosInstance.defaults.headers['x-csrf-token'] = data.csrfToken;

    return data;
  } catch (err) {
    console.error('Error during postLogin()');
    throw err;
  }
};

export const postSignUp = async (reqBody: SignUp) => {
  try {
    const { data } = await axiosInstance.post('/account/signup', reqBody);
    return data;
  } catch (err) {
    throw err;
  }
};

export const postForgotPassword = async (email: string) => {
  try {
    const { data } = await axiosInstance.post('/account/forgotPassword', {
      email,
    });
    return data;
  } catch (err) {
    throw err;
  }
};

export const postResetPassword = async (reqBody: ResetPassword) => {
  try {
    const { data } = await axiosInstance.post('/account/resetPassword', reqBody);
    return data;
  } catch (err) {
    throw err;
  }
};

export const getVerifyAccount = async (tokenEmail: VerifyAccount) => {
  const { email, token } = tokenEmail;
  try {
    const { data } = await axiosInstance.get(
      `/account/verifyAccount?token=${token}&email=${email}`,
    );
    return data;
  } catch (err) {
    throw err;
  }
};

export const getNewToken = async () => {
  try {
    await axiosInstance.get('/account/refresh');
  } catch (err) {
    throw err;
  }
};

export const getLogout = async () => {
  try {
    const { data } = await axiosInstance.get('/account/logout');
    return data;
  } catch (err) {
    console.error('Error during getLogout()');
    throw err;
  }
};
