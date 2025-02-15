import { createReducer, on } from "@ngrx/store";
import { Product } from "../../models/productTemplate";
import { initializeTagProductLoad, tagProductLoadSuccess } from "./tag.actions";


const initialState: Product[] = []; 

export const tagProductReducer = createReducer(
    initialState, 
    on(initializeTagProductLoad, (state) => state), 
    on(tagProductLoadSuccess, (state, { tagProducts }) => ({
        ...state, 
        tagProducts
    })), 

); 