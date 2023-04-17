import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTasks } from '../../store/task/taskSlice';
import { Task } from './Task';

const Loader = () => {
	return (<div className='flex flex-row w-full items-center justify-center pt-24'>
		<div class="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-tr from-emerald-500 to-gray-200 animate-spin">
			<div class="h-9 w-9 rounded-full bg-gray-200"></div>
		</div>
	</div>);
};
export const TaskList = () => {
	const dispatch = useDispatch();
	const { tasks, loading, error } = useSelector((state) => state.task);

	useEffect(() => {
		dispatch(fetchTasks());
	}, [dispatch]);
	if (loading) return <Loader></Loader>;
	return (
		<div>
			<div className="mt-8 mx-48">
				{tasks.length === 0 && <div className='flex flex-row justify-center'>No tasks found.</div>}
				{tasks.map((task) => (
					<Task key={task.id} task={task} />
				))}
				{error && <div>{error}</div>}
			</div>
		</div>
	);
};
