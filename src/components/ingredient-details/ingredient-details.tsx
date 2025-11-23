import { FC } from 'react';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { useSelector } from '../../services/store';
import { useParams } from 'react-router-dom';

export const IngredientDetails: FC = () => {
  const { id } = useParams(); 
  const ingredientData = useSelector((state) => state.ingredients.ingredients); 
  if (ingredientData.length === 0) {
    return <Preloader />;
  }
  
  const ingredient = ingredientData.find((item) => item._id === id);
  if (!ingredient) {
    return; 
  }
  return <IngredientDetailsUI ingredientData={ingredient} />; 
};