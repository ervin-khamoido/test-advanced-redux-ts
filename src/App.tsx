import React, { useEffect } from 'react';
import './App.css';
import PostContainer from './components/PostContainer';
import PostContainer2 from './components/PostContainer2';
import { useAppDispatch, useAppSelector } from './hooks/redux';
import { fetchUsers } from './store/reducers/ActionCreators';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import UserSlice, { userSlice } from './store/reducers/UserSlice';

function App() {
	// const {count} = useAppSelector(state => state.userReducer);
	// const {increment} = userSlice.actions;
	const dispatch = useAppDispatch();
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const {error, isLoading, users} = useAppSelector(state => state.userReducer);

	useEffect(() => {
		dispatch(fetchUsers());
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	if (isLoading) {
		return <div>Loading...</div>
	}

	if (error) {
		return <div>{error}</div>
	}

	return (
		<div className="App">
			{/* <h1>{count}</h1> */}
			{/* <button onClick={() => dispatch(increment(1))}>increment</button> */}

			{/* {JSON.stringify(users, null, 2)} */}
			
			<div style={{display: 'flex'}}>
				<PostContainer />
				<PostContainer2 />
			</div>
		</div>
	);
}

export default App;