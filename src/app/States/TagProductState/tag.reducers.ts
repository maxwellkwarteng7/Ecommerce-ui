import { createReducer, on } from "@ngrx/store";
import { Product } from "../../models/productTemplate";
import { initializeTagProductLoad, tagProductLoadFailure, tagProductLoadSuccess } from "./tag.actions";


const initialState: Product[] = []; 

export const tagProductReducer = createReducer(
    initialState, 
    on(initializeTagProductLoad, (state, { tag }) => ({
        ...state, 
        tag
    })), 
    on(tagProductLoadSuccess, (state, { tagProducts }) => ({
        ...state, 
        tagProducts
    })), 
    on(tagProductLoadFailure, (state, { error }) => ({
        ...state, 
        error
    }))

); 