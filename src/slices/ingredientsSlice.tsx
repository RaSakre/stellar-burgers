import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { getIngredientsApi } from "../utils/burger-api";
import { TIngredient } from "@utils-types";

interface IngredientsState {
  ingredients: TIngredient[];
	isIngredientsLoading: boolean,
}

const initialState: IngredientsState = {
  ingredients: [],
	isIngredientsLoading:false,
};

export const fetchIngredients = createAsyncThunk(
	'ingredients/fetchIngredtiens',
	async () => {
		const response = await getIngredientsApi();
    return response;
	}
)



export const ingredientsSlice = createSlice({
	name: 'ingredientsSlice',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
		.addCase( fetchIngredients.pending, (state, action) => {
			state.isIngredientsLoading = true
		})
		.addCase( fetchIngredients.rejected, (state, action) => {
			state.isIngredientsLoading = true;
		})
		.addCase( fetchIngredients.fulfilled, (state, action) => {
			state.ingredients = action.payload
			state.isIngredientsLoading = false
		})
	},
  selectors: {
		selectIngredients: (state) => state.ingredients
},
})

export const {selectIngredients} = ingredientsSlice.selectors


export default ingredientsSlice.reducer