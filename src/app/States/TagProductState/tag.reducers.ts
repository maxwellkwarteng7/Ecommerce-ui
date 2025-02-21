import { createReducer, on } from "@ngrx/store";
import { Product, productsTemplate } from "../../models/productTemplate";
import { initializeTagProductLoad, tagProductLoadFailure, tagProductLoadSuccess } from "./tag.actions";

let products: Product[] = [];

const initialState: productsTemplate = {
    currentPage: 0, 
    totalPages: 0, 
    products
}

export const tagProductReducer  = createReducer(
    initialState, 
    on(initializeTagProductLoad, (state, { tag }) => ({
        ...state, 
        tag
    })), 
    on(tagProductLoadSuccess, (state , {products , currentPage , totalPages}) => ({
        ...state,
        currentPage, 
        totalPages,
        products, 
    })),
    
    on(tagProductLoadFailure, (state, { error }) => ({
        ...state, 
        error
    }))

); 