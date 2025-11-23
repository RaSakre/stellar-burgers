import React, { FC, memo, SyntheticEvent } from 'react';
import { useLocation } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';


import { BurgerIngredientUI } from '@ui';
import { TBurgerIngredientProps } from './type';
import {useDispatch, useSelector} from '../../services/store'
import { addBun, addIngredients} from '../../slices/ingredientsConstructorSlice';

export const BurgerIngredient: FC<TBurgerIngredientProps> = memo(
  ({ ingredient, count }) => {
		const ingrData = { ...ingredient, id: uuidv4() }
		const dispatch = useDispatch()
    const location = useLocation();
    const handleAdd = () => {
			const { type} = ingredient
			if(type === 'bun'){
			dispatch(addBun(ingrData))
			} else if (type !== 'bun'){
				dispatch(addIngredients(ingrData))
			} 
		};

    return (
      <BurgerIngredientUI
        ingredient={ingredient}
        count={count}
        locationState={{ background: location }}
        handleAdd={handleAdd}
      />
    );
  }
);
