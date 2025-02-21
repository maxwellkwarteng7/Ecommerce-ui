import { createAction, props } from "@ngrx/store";
import { Product, productsTemplate } from "../../models/productTemplate"; 


export const initializeTagProductLoad = createAction('[productTemplate] load tag products' , props<{tag : string}>()); 

export const tagProductLoadSuccess = createAction('[productsTemplate] tag product load success', props<productsTemplate>()); 

export const tagProductLoadFailure = createAction('[productTemplate] tag product load failure', props<{ error: any }>()); 