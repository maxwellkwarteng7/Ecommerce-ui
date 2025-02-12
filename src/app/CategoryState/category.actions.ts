import { createAction, props } from "@ngrx/store";
import { Category } from "../models/productTemplate";


const initialState: Category[] = []; 



export const addCategory = createAction('[Category] Add category', props<Category>()); 

export const removeCategory = createAction('[Category] remove category', props<{ categoryId: string }>())

export const updateCategory = createAction('[Category] update category' , props<{categoryId : string}>())



