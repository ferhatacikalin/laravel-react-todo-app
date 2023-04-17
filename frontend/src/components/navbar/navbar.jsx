import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { logoutUser, verifyUserDetails } from '../../store/auth/authActions';

const Navbar = () => {
	const dispatch = useDispatch();
	const { user, accessToken } = useSelector((state) => state.auth);

	useEffect(() => {
		if (accessToken) {
			dispatch(verifyUserDetails());
		}

	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const logoutHandler = () => {
		dispatch(logoutUser());
	};

	return (
		<header className = "rounded mt-1 border-l-8 border-emerald-900	bg-emerald-200" aria-label="Page Header">
			<div className="px-4 py-8 sm:px-6 sm:py-3 lg:px-8">
				<div className="sm:flex sm:items-center sm:justify-between">
					<div className="text-center sm:text-left">
						<h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
							{user ? `Welcome ${user.name}` : 'Login to create tasks!'}
						</h1>

						<p className="mt-1.5 text-sm text-black-500">
							Todo App
						</p>
					</div>

					<div className="mt-4 flex flex-col gap-4 sm:mt-0 sm:flex-row sm:items-center">

						<div>
							{user ? (
								<NavLink onClick={logoutHandler}>
								Logout
								</NavLink>
							) : (
								<NavLink to='/login'>
									Login
								</NavLink>
							)}
						</div>
					</div>
				</div>
			</div>
		</header>
	);
};

export { Navbar };
