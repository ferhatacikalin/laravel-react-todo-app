import React from 'react';
import { useDispatch } from 'react-redux';
import moment from 'moment';
import { useNavigate } from 'react-router';
import { updateTask, deleteTask } from '../../store/task/taskSlice';

export const Task = ({ task }) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const handleDelete = () => {
		dispatch(deleteTask(task.id));
	};
	const formatDate = (date) => {
		if (moment(date).isValid()) {
			return moment(date).format('MMM Do YYYY');
		}

		return 'No Due Date';
	};
	const handleComplete = () => {
		dispatch(updateTask({ ...task, status: task.status === 'pending' ? 'completed' : 'pending' }));
	};
	const handleUpdate = () => {
		navigate('/updatetask', { state: { task } });
	};
	return (
		<div className="flex items-center justify-between p-4 mb-4 bg-white rounded-lg shadow">
			<label htmlFor={`task-${task.id}`} className="flex items-center">
				<input
					type="checkbox"
					id={`task-${task.id}`}
					checked={task.status === 'completed'}
					onChange={handleComplete}
					className="mr-2 form-checkbox h-8 w-8  border-gray-300 rounded-md text-emerald-100"
				/>
				<div className={`pl-4 ${task.status === 'completed' ? 'line-through ' : ''}`}>
					<div className='text-2xl text-black-400'>{task.title}</div>
					<div className='text-base text-emerald-400'>{task.description}</div>
					<div className='text-xs text-gray-400'>{formatDate(task.due_date)}</div>
				</div>
			</label>
			<div className='flex flex-row gap-3'>
				<button onClick={handleUpdate} className="text-gray-500 hover:text-emerald-500"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
					<path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
				</svg>

				</button>
				<button onClick={handleDelete} className="text-gray-500 hover:text-red-500"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
					<path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
				</svg>
				</button>

			</div>
		</div>
	);
};
