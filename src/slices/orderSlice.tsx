import { getOrdersApi } from "../utils/burger-api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { TOrder } from "@utils-types";

interface IOrder {
	orderRequest:boolean,
	orderModalData:TOrder,
	ordersProfile: TOrder[],
}

export const initialState:IOrder = {
	orderRequest: false,
	orderModalData: {
		_id: '',
		status: '',
		name: '',
		createdAt: '',
		updatedAt: '',
		number: 0,
		ingredients: [],
	},
	ordersProfile: [],
}

export const getProfileOrders = createAsyncThunk(
	'orders/getProfileOrders',
	async () => {
		return await getOrdersApi()
	}
)



const orderSlice = createSlice({
	name: 'orderSlice',
	initialState,
	reducers: {
		orderRequestStatus: (state, action) => {
			state.orderRequest = action.payload
		},
		orderModalDataChanges: (state, action) => {
			state.orderModalData = action.payload
		},
	},
	extraReducers: (builder) => {
		builder
					.addCase(getProfileOrders.fulfilled, (state, action) => {
						state.ordersProfile = action.payload
					})
					
}
})

export const getProfileOrdersSelector = (state:any) => state.orderReducer.ordersProfile;

export const {orderRequestStatus, orderModalDataChanges} = orderSlice.actions
export default orderSlice.reducer