import { createAction, props } from "@ngrx/store";
import { Category , Product } from "../../models/productTemplate";



export const initializeCategoryLoad = createAction('[Category] fetch categories');

export const CategoryLoadSuccess = createAction('[Category] category load success', props<{ categories: Category[] }>());

export const categoryLoadFailure = createAction('[Category] category load failure', props<{ error: any }>()); 

export const cartCount = createAction('[Cart] cart count'); 




