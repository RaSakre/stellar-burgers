import { getFeedsApi, getOrderByNumberApi } from "../utils/burger-api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { TOrder } from "@utils-types";

export const getFeedOrders = createAsyncThunk(
	'orders/getFeedOrders',
	async () => {
		return await getFeedsApi()
	}
)

export const getOrderByNumber = createAsyncThunk(
	'order/getOrderByNumber',
	async (number:number) => {
		return await getOrderByNumberApi(number)
	}
)

interface IFeed {
	orderFeedData:TOrder,
	ordersFeed: TOrder[],
	feed: {
		total: number,
		totalToday:number,
	},
	ordersFeedIngredients: string[]
}



export const initialState:IFeed = {
	orderFeedData: {
		_id: '',
		status: '',
		name: '',
		createdAt: '',
		updatedAt: '',
		number: 0,
		ingredients: [],
	},
	ordersFeed: [],
	feed: {
		total: 0,
		totalToday: 0,
	},
	ordersFeedIngredients: [],
}

const feedSlice = createSlice({
	name: 'feedSlice',
	initialState,
	reducers: {
		orderAddToFeed: (state, action) => {
			state.orderFeedData = action.payload
		},
		filterOrdersFeedByIds: (state, action) => {
			state.orderFeedData.ingredients = action.payload
		},
	},
	extraReducers: (builder) => {
		builder
					.addCase(getFeedOrders.fulfilled, (state, action) => {
						state.feed.total = action.payload.total
						state.feed.totalToday = action.payload.totalToday
						state.ordersFeed = action.payload.orders
						state.ordersFeedIngredients = action.payload.orders.flatMap(order => order.ingredients);
					})
					.addCase(getOrderByNumber.fulfilled, (state, action) =>{
						state.orderFeedData = action.payload.orders[0]
					})
}})

export const getOrdersFeed = (state:any) => state.feedReducer.ordersFeed;
export const getOrdersFeedData = (state:any) => state.feedReducer.orderFeedData;

export const {orderAddToFeed, filterOrdersFeedByIds} = feedSlice.actions
export default feedSlice.reducer