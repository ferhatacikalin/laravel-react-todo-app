import { Route, Routes } from 'react-router-dom';
import { Home } from '../../pages/home';
import { Login } from '../../pages/login';
import { Register } from '../../pages/register';
import { CreateTaskPage } from '../../pages/createtask';
import { UpdateTaskPage } from '../../pages/updatetask';
import { PrivateRoute } from '../privateRoute';
import { PublicRoute } from '../publicRoute';
import Styles from './app.module.scss';

function App() {
	return (
		<div>
			<Layout>
				<Routes>
					<Route path="/" element={<PrivateRoute component={Home} />} />
					<Route path="/createtask" element={<PrivateRoute component={CreateTaskPage} />} />
					<Route path="/updatetask" element={<PrivateRoute component={UpdateTaskPage} />} />
					<Route path='/login' element={<PublicRoute restricted={true} component={Login} />} />
					<Route path='/register' element={<PublicRoute restricted={true} component={Register} />} />
				</Routes>
			</Layout>
		</div>
	);
}

const Layout = ({ children }) => (
	<div className={Styles.mainContainer}>
		<div className={Styles.contentContainer}>
			<div className="container mx-auto">
				{children}
			</div>
		</div>
	</div>
);

export { App };
