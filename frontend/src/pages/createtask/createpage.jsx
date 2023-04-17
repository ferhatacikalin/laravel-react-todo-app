/* eslint-disable no-mixed-spaces-and-tabs */
import { useNavigate } from 'react-router';
import { TaskForm } from '../../components/taskComponents';

export const CreateTaskPage = () => {
	const navigate = useNavigate();
	const handleClose = () => {
		navigate(-1);
	};
	return (
		<div className='mx-96 mt-24'>
			<TaskForm onClose={handleClose}/>
		</div>
	);
};
