// constants
import axios from "axios";


const SET_USER = "session/SET_USER";
const REMOVE_USER = "session/REMOVE_USER";

const setUser = (user) => ({
	type: SET_USER,
	payload: user,
});

const removeUser = () => ({
	type: REMOVE_USER,
});

const initialState = { user: null };

export const authenticate = () => async (dispatch) => {
	// const response = await fetch("/api/auth/", {
	// 	headers: {
	// 		"Content-Type": "application/json",
	// 	},
	// });
	// if (response.ok) {
	// 	const data = await response.json();
	// 	if (data.errors) {
	// 		return;
	// 	}

	// 	dispatch(setUser(data));
	// }
    const { data } = await axios.post(
        "/",
        {},
        { withCredentials: true }
      );
	const { user } = data;
	dispatch(setUser(user))
};

export const login = (email, password) => async (dispatch) => {
	// const response = await fetch("/login", {
	// 	method: "POST",
	// 	headers: {
	// 		"Content-Type": "application/json",
	// 	},
	// 	body: JSON.stringify({
	// 		email,
	// 		password,
	// 	}),
	// });
	console.log(email, password, 'inside dispatch');

	const { data } = await axios.post(
	"/login",
	{
		email, password
	},
	{ withCredentials: true }
	);
	console.log(data)
	if (data.success) {
		// const data = await response.json();
		dispatch(setUser(data.user));
		return data;
	}
	else {
		return {
			error: 'error',
			message: data.message,
		};
	}
};

export const logout = () => async (dispatch) => {

	dispatch(removeUser())
};

export const signUp = (username, email, password) => async (dispatch) => {
	const response = await fetch("/api/auth/signup", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			username,
			email,
			password,
		}),
	});

	if (response.ok) {
		const data = await response.json();
		dispatch(setUser(data));
		return null;
	} else if (response.status < 500) {
		const data = await response.json();
		if (data.errors) {
			return data.errors;
		}
	} else {
		return ["An error occurred. Please try again."];
	}
};

export default function reducer(state = initialState, action) {
	switch (action.type) {
		case SET_USER:
			return { user: action.payload };
		case REMOVE_USER:
			return { user: null };
		default:
			return state;
	}
}
