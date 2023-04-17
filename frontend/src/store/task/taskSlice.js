import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosConfig from '../../utils/axiosConfig';

const initialState = {
	tasks: [],
	loading: false,
	error: null,
};

export const fetchTasks = createAsyncThunk('tasks/fetchTasks', async () => {
	const response = await axiosConfig.get('/tasks');
	return response.data;
});

export const createTask = createAsyncThunk('tasks/createTask', async (taskData) => {
	const response = await axiosConfig.post('/tasks', taskData);
	return response.data;
});

export const updateTask = createAsyncThunk('tasks/updateTask', async (taskData) => {
	const response = await axiosConfig.put(`/tasks/${taskData.id}`, taskData);
	return response.data;
});

export const deleteTask = createAsyncThunk('tasks/deleteTask', async (taskId) => {
	await axiosConfig.delete(`/tasks/${taskId}`);
	return taskId;
});

export const tasksSlice = createSlice({
	name: 'tasks',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchTasks.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(fetchTasks.fulfilled, (state, action) => {
				state.tasks = action.payload;
				state.loading = false;
			})
			.addCase(fetchTasks.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message;
			})
			.addCase(createTask.fulfilled, (state, action) => {
				state.tasks.push(action.payload);
			})
			.addCase(updateTask.fulfilled, (state, action) => {
				const index = state.tasks.findIndex((task) => task.id === action.payload.id);
				if (index !== -1) {
					state.tasks[index] = action.payload;
				}
			})
			.addCase(deleteTask.fulfilled, (state, action) => {
				state.tasks = state.tasks.filter((task) => task.id !== action.payload);
			});
	},
});

export default tasksSlice.reducer;
