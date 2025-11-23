import { loginUserApi } from "../utils/burger-api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { setCookie } from "../utils/cookie";

interface TUserState {
  isAuthenticated: boolean,
  user: {
		email:string,
		name:string,
	},
  loginUserError: undefined | string 
  loginUserRequest: boolean,
}

interface IUserData {
		email: string,
		password:string,
}

export const loginUser = createAsyncThunk(
	'user/loginUser',
	async ({email, password}:IUserData) => {
		const data =  await loginUserApi({email, password})
		setCookie('accessToken', data.accessToken);
		localStorage.setItem('refreshToken', data.refreshToken)
		return data
	}
)

export const initialState: TUserState = {
  isAuthenticated: false,
  user: {
		email: '',
		name: '',
	},
  loginUserError: '',
  loginUserRequest: false,
};

const loginSlice = createSlice({
	name: 'loginSlice',
	initialState,
	reducers: {
		logOutParam: (state, action) => {
			state.isAuthenticated = action.payload
		},
		setAuthState: (state, action) => {
      state.isAuthenticated = action.payload
    }
	},
	extraReducers: (builder) => {
		builder
					.addCase(loginUser.pending, (state) => {
				state.loginUserRequest = true;
				state.loginUserError = ''
					})
		.addCase(loginUser.rejected, (state, action) => {
				state.loginUserRequest = false;
				state.loginUserError = action.error.message;
		})
		.addCase(loginUser.fulfilled, (state, action) => {
				state.user = action.payload.user;
				state.loginUserRequest = false;
				state.isAuthenticated = action.payload.success;
				state.loginUserError = '';
		})
}
})

export const getLoginState = (state:any) => state.loginReducer;

export const {logOutParam, setAuthState} = loginSlice.actions

export default loginSlice.reducer