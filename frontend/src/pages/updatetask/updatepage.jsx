/* eslint-disable no-mixed-spaces-and-tabs */
import { useNavigate, useLocation } from 'react-router';
import { TaskForm } from '../../components/taskComponents';

export const UpdateTaskPage = () => {
	const navigate = useNavigate();
	const location = useLocation();
	console.log(location.state.task);
	const handleClose = () => {
		navigate(-1);
	};
	return (
		<div className='mx-96 mt-24'>
			<TaskForm onClose={handleClose} task={location.state.task}/>
		</div>
	);
};
