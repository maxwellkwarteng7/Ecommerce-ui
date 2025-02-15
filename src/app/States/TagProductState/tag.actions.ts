import { createAction, props } from "@ngrx/store";
import { Product } from "../../models/productTemplate"; 


export const initializeTagProductLoad = createAction('[Product] load tag products'); 

export const tagProductLoadSuccess = createAction('[Product] tag product load success', props<{ tagProducts: Product[] }>()); 

export const tagProductLoadFailure = createAction('[Product] tag product load failure', props<{ error: string }>()); 