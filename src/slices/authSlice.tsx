import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { registerUserApi, TRegisterData } from "../utils/burger-api";

interface IFormValues {
	form: {
		name: string,
		email: string,
		password: string,
	},
	error: string | undefined,
	sending: boolean,
	isRegistered: boolean
}

type TLoginData = {
	name:string,
	email: string,
	password: string
}

type TFieldType<T> = {
	field: keyof T;
	value: string;
} 

export const fetchRegister = createAsyncThunk(
	'register/fetchRegister',
	async (data:TRegisterData) => {
		const response = await registerUserApi(data)
		return response
	}
)

export const initialState:IFormValues = {
	form: {
			name: '',
			email: "",
			password: ""
	},
	error: '',
	sending: false,
	isRegistered: false,
};

const authSlice = createSlice({
	name: 'authSlice',
	initialState,
	reducers: {
		setFormValues: (state, action: PayloadAction<TFieldType<TLoginData>>) => {
			state.form[action.payload.field] = action.payload.value;
	}
	},
	extraReducers: (builder) => {
		builder
				.addCase(fetchRegister.pending, (state) => {
						state.error = '';
						state.sending = true;
						state.isRegistered = false
				})
				.addCase(fetchRegister.rejected, (state, action) => {
						state.sending = false;
						state.error = action.error.message ?? undefined;
						state.isRegistered = false
				})
				.addCase(fetchRegister.fulfilled, (state, action) => {
						state.sending = false;
						state.isRegistered = action.payload.success
				})
}
})

export default authSlice.reducer
export const {setFormValues} = authSlice.actions