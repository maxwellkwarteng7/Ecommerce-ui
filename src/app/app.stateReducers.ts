import { AppState } from "./app.state";
import { categoryReducer } from "./States/CategoryState/category.reducers";
import { tagProductReducer } from "./States/TagProductState/tag.reducers";

export const appStore : AppState = {
    category: categoryReducer, 
    tagProducts : tagProductReducer
}