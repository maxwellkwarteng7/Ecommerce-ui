import { ApplicationConfig, provideZoneChangeDetection } from "@angular/core";
import { provideRouter, withInMemoryScrolling, withRouterConfig } from "@angular/router";
import { provideStore } from "@ngrx/store";

import { routes } from "./app.routes";
import { provideHttpClient } from "@angular/common/http";

import { provideAnimations } from "@angular/platform-browser/animations";
import { provideToastr } from "ngx-toastr";

import { provideEffects } from "@ngrx/effects";
import { CategoryEffect } from "./States/CategoryState/category.effects";
import { appStore } from "./app.stateReducers";
import { TagProductEffect } from "./States/TagProductState/tag.effects";

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withInMemoryScrolling({
      scrollPositionRestoration: 'enabled', 
      anchorScrolling : 'enabled'
    })),
    provideHttpClient(),
    provideStore(appStore),
    provideEffects(CategoryEffect, TagProductEffect),
    provideAnimations(),
    provideToastr({
      timeOut: 3000,
      progressAnimation: "increasing",
      progressBar: true,
      preventDuplicates: true,
      closeButton: true,
      positionClass: "toast-top-right",
    }),
  ],
};
