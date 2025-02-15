import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideStore } from '@ngrx/store';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http'; 
import { AppState } from './app.state';
import { provideAnimations } from '@angular/platform-browser/animations'; 
import {provideToastr} from 'ngx-toastr'; 
import { categoryReducer } from './States/CategoryState/category.reducers';
import { provideEffects } from '@ngrx/effects';
import { CategoryEffect } from './States/CategoryState/category.effects';
import { tagProductReducer } from './States/TagProductState/tag.reducers';
import { appStore } from './app.stateReducers';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideHttpClient(), provideStore(appStore), provideEffects(CategoryEffect) ,  provideAnimations(), provideToastr({
    timeOut: 3000, 
    progressAnimation: 'increasing',
    progressBar : true ,
    preventDuplicates: true, 
    closeButton: true, 
    positionClass: 'toast-top-right'
  })]
};
