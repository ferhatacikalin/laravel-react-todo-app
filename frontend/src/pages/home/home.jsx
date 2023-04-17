/* eslint-disable no-mixed-spaces-and-tabs */
import { useNavigate } from 'react-router';
import { TaskList } from '../../components/taskComponents';

export const Home = () => {
	const navigate = useNavigate();
	const handleNewTaskButton = () => {
		navigate('/createtask');
	};
	return (
		<div>
			<div class="flex justify-between items-center mt-12 mx-24">
				<div class="text-2xl font-bold  text-gray-700">Task List</div>
				<button onClick={handleNewTaskButton} class="inline-flex items-center px-2 py-2 bg-emerald-200 hover:bg-gray-300 text-gray-800 text-sm font-medium rounded-md">
					<span className='px-2'>New Task</span>
					<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
						<path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
					</svg>

				</button>
			</div>
			<TaskList />
		</div>
	);
};
