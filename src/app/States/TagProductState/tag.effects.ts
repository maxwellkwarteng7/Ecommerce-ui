import { Actions, createEffect, ofType } from "@ngrx/effects";
import { ProductServiceService } from "../../services/product-service/product-service.service";
import { inject } from "@angular/core";
import { initializeTagProductLoad, tagProductLoadFailure } from "./tag.actions";
import { catchError, map, mergeMap, Observable, of } from "rxjs";
import { Toast, ToastrService } from "ngx-toastr";


export class tagProductEffect  {
    
    loadTagProducts$: Observable<any>; 


    constructor(private actions$: Actions, private toaster: ToastrService, private productService: ProductServiceService) {
        
        this.loadTagProducts$ = createEffect(() => this.actions$.pipe(
            ofType(initializeTagProductLoad), 
            mergeMap(({ tag }) => this.productService.getProductByTag(tag).pipe(
                map((data) => console.log(data)), 
                catchError((error) =>{
                    this.toaster.error('error fetching Tag Product');
                    return of(tagProductLoadFailure({error}))
                })
            )
        ))
   }
}