import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects'; 
import { ProductServiceService } from "../../services/product-service/product-service.service";
import { categoryLoadFailure, CategoryLoadSuccess, initializeCategoryLoad } from "./category.actions";
import { catchError, map, mergeMap, Observable, of } from "rxjs";


@Injectable() 


export class CategoryEffect {
    
    loadCategories$: Observable<any>;
    
    constructor(private action$: Actions, private productService: ProductServiceService) {

        this.loadCategories$ = createEffect(() => this.action$.pipe(

            ofType(initializeCategoryLoad), 

            mergeMap(() => this.productService.getCategories().pipe(
                map((categories) => {
                    return CategoryLoadSuccess({categories})
                }), 
                catchError((error) => of(categoryLoadFailure(error)))
            ))
        ))  
    }

  

}