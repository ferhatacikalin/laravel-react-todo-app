/* eslint-disable camelcase */
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createTask, updateTask } from '../../store/task/taskSlice';

export const TaskForm = ({ task = null, onClose }) => {
	const [title, setTitle] = useState(task ? task.title : '');
	const [description, setDescription] = useState(task ? task.description : '');
	const [due_date, setdue_date] = useState(task ? task.due_date : '');
	const dispatch = useDispatch();

	const handleSubmit = (event) => {
		event.preventDefault();
		if (title.trim() === '') {
			alert('Title is required.');
			return;
		}
		if (task) {
			dispatch(updateTask({
				id: task.id, title, description,
			}));
		} else {
			dispatch(createTask({ title, description, due_date }));
		}
		onClose();
	};

	return (
		<form onSubmit={handleSubmit}>
			<div className="mb-4">
				<label
					className="block text-gray-700 font-bold mb-2"
					htmlFor="title"
				>
          Title <span className="text-red-500">*</span>
				</label>
				<input
					type="text"
					id="title"
					name="title"
					className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
					value={title}
					onChange={(event) => setTitle(event.target.value)}
					required
				/>
			</div>
			<div className="mb-4">
				<label className="block text-gray-700 font-bold mb-2" htmlFor="description">
          Description
				</label>
				<textarea
					id="description"
					name="description"
					className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
					value={description}
					onChange={(event) => setDescription(event.target.value)}
				/>
			</div>
			<div className="mb-4">
				<label className="block text-gray-700 font-bold mb-2" htmlFor="due_date">
                    Due Date
				</label>
				<div>
					<input type="date" id="due_date" name="due_date" value={due_date} onChange={(event) => setdue_date(event.target.value)} />
				</div>
			</div>
			<div className="flex justify-between mt-10">
				<button
					className="bg-emerald-500 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
					type="submit"
				>
					{task ? 'Save' : 'Create'}
				</button>
				<button
					className="bg-gray-400 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
					type="button"
					onClick={onClose}
				>
          Cancel
				</button>
			</div>
		</form>
	);
};
