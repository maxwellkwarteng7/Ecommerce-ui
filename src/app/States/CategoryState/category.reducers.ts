import { createReducer, on } from "@ngrx/store";
import { Category } from "../../models/productTemplate";
import { CategoryLoadSuccess, initializeCategoryLoad } from "./category.actions";




const initialState: Category[] = []; 

export const categoryReducer = createReducer(
    initialState, 
    on(initializeCategoryLoad, (state) => state), 
    on(CategoryLoadSuccess, (state, { categories }) => ({
        ...state, 
        categories
    }))
)