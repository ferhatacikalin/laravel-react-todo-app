import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosConfig from '../../utils/axiosConfig';

export const registerUser = createAsyncThunk('user/register', async ({
	fullName, email, password
}, { rejectWithValue }) => {
	try {
		const response = await axiosConfig.post('/auth/register', {
			name: fullName,
			email,
			password
		});

		return await response.data.message;
	} catch (error) {
		return rejectWithValue({
			error: error.response.data ? error.response.data.message : error.message
		});
	}
});

export const loginUser = createAsyncThunk('user/login', async ({
	email, password
}, { rejectWithValue }) => {
	try {
		const response = await axiosConfig.post('/auth/login', {
			email, password
		});
		await console.log(response.data.data.token);
		return await response.data;
	} catch (error) {
		return rejectWithValue({
			error: error.response.data ? error.response.data.message : error.message
		});
	}
});

export const verifyUserDetails = createAsyncThunk('user/verify', async (_, { rejectWithValue }) => {
	try {
		const response = await axiosConfig.get('/me');

		return await response.data;
	} catch (error) {
		return rejectWithValue({
			error: error.response.data ? error.response.data.message : error.message
		});
	}
});

export const logoutUser = createAsyncThunk('user/logout', async (_, { rejectWithValue }) => {
	try {
		const response = await axiosConfig.post('/logout');

		return response.data.message;
	} catch (error) {
		return rejectWithValue({
			error: error.response.data ? error.response.data.message : error.message
		});
	}
});
