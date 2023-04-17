import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth/authSlice';
import taskReducer from './task/taskSlice';
import { injectStore } from '../utils/axiosConfig';

const store = configureStore({
	reducer: {
		auth: authReducer,
		task: taskReducer
	}
});

injectStore(store);

export default store;
