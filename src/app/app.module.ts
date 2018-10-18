import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { GalleriesComponent } from './galleries/galleries.component';

import { GalleryService } from './services/gallery.service';
import { FavoritesService } from './services/favorites.service';
import { MyInterceptor } from './services/my-interceptor';
import { AlbumFormComponent } from './album-form/album-form.component';
import { AlbumDetailsComponent } from './album-details/album-details.component';
import { AppRoutingModule } from './app-routing.module';
import { FavoritesComponent } from './favorites/favorites.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FavoriteFormComponent } from './favorites/favorite-form/favorite-form.component';

@NgModule({
  declarations: [
    AppComponent,
    GalleriesComponent,
    AlbumFormComponent,
    AlbumDetailsComponent,
    FavoritesComponent,
    NavbarComponent,
    FavoriteFormComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [
  	GalleryService, 
    FavoritesService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MyInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
