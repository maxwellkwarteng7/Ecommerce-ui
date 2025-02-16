import { Actions, createEffect, ofType } from "@ngrx/effects";
import { ProductServiceService } from "../../services/product-service/product-service.service";
import { inject, Injectable } from "@angular/core";
import { initializeTagProductLoad, tagProductLoadFailure, tagProductLoadSuccess } from "./tag.actions";
import { catchError, map, mergeMap, of } from "rxjs";
import { ToastrService } from "ngx-toastr";

@Injectable()
export class TagProductEffect {
    
    private actions$ = inject(Actions);
    private toaster = inject(ToastrService);
    private productService = inject(ProductServiceService);

    loadTagProducts$ = createEffect(() => this.actions$.pipe(
        ofType(initializeTagProductLoad),
        mergeMap(({ tag }) => this.productService.getProductByTag(tag).pipe(
            map((data) => {
                return tagProductLoadSuccess({ tagProducts : data });
            }),
            catchError((error) => {
                this.toaster.error('Error fetching tag products');
                return of(tagProductLoadFailure({ error }));
            })
        )) 
    ));
}
