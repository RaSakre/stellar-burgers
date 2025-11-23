import { createSlice } from "@reduxjs/toolkit";
import { TIngredient, TOrder } from "@utils-types";
import { PayloadAction } from "@reduxjs/toolkit";




interface IngredientsConstructor {
	bun: {
		_id: string ;
		name: string;
		type: string;
		proteins: number;
		fat: number;
		carbohydrates: number;
		calories: number;
		price: number;
		image: string;
		image_large: string;
		image_mobile: string;
	},
	ingredients: TIngredient[],
}

interface IngredientsState {
  ingredientsConstructor:IngredientsConstructor;

}

export const initialState:IngredientsState = {
	ingredientsConstructor: {
		bun: {
			_id: '' ,
			name: '',
			type: '',
			proteins: 0,
			fat: 0,
			carbohydrates: 0,
			calories: 0,
			price: 0,
			image: '',
			image_large: '',
			image_mobile: '',
		},
		ingredients: [],
}
}



const ingredientsConstructorSlice = createSlice({
	name: 'ingredientsConstructorSlice',
	initialState,
	reducers: {
		addBun: (state, action) => {
			state.ingredientsConstructor.bun = {...action.payload}
		},
		addIngredients: (state, action) => {
			state.ingredientsConstructor.ingredients.push(action.payload); 
		},
		deleteIngredient: (state, action: PayloadAction<{ _id: string }>) => {
			const index = state.ingredientsConstructor.ingredients.findIndex(
				ingredient => ingredient._id === action.payload._id
			);
			
			if (index !== -1) {
				state.ingredientsConstructor.ingredients.splice(index, 1);
			}
		},
		clearConstructor: (state ) => {
			state.ingredientsConstructor.bun = {_id: '' ,
				name: '',
				type: '',
				proteins: 0,
				fat: 0,
				carbohydrates: 0,
				calories: 0,
				price: 0,
				image: '',
				image_large: '',
				image_mobile: '',}
			state.ingredientsConstructor.ingredients = []
		},
		moveIngredient: (state, action) => {
		const {fromIndex, toIndex} = action.payload
		const ingredients = state.ingredientsConstructor.ingredients
		const [movedIngredient] = ingredients.splice(fromIndex, 1)
		ingredients.splice(toIndex, 0, movedIngredient)
		state.ingredientsConstructor.ingredients = ingredients
		},
	},
})


export const {
  addBun,
  addIngredients,
  deleteIngredient,
  moveIngredient,
  clearConstructor
} = ingredientsConstructorSlice.actions;

export default ingredientsConstructorSlice.reducer