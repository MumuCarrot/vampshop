import { provideRouter, Routes } from "@angular/router";
import { ApplicationConfig } from "@angular/core";

import { HomeComponent } from "./Home.component"
import { ProductComponent } from "./product.component"
import { ErrorComponent } from "./error.component";
import { CartComponent } from "./cart.component"
import { provideHttpClient, withFetch } from "@angular/common/http";

const appRoutes: Routes = [
    { path: "", component: HomeComponent },
    { path: "p/:id", component: ProductComponent },
    { path: "c", component: CartComponent},
    { path: "**", component: ErrorComponent }
];

export const appConfig: ApplicationConfig = {
    providers: [
        provideRouter(appRoutes),
        provideHttpClient(withFetch())
    ]
};