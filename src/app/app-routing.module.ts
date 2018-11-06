import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GalleriesComponent } from './galleries/galleries.component';
import { AlbumFormComponent } from './album-form/album-form.component';
import { AlbumDetailsComponent } from './album-details/album-details.component';
import { FavoritesComponent } from './favorites/favorites.component';

const appRoutes: Routes = [
	
	{ path: '', component: GalleriesComponent },
	{ path: 'favorites', component: FavoritesComponent }
];

@NgModule({
	imports: [RouterModule.forRoot(appRoutes)],
	exports: [RouterModule]
})

export class AppRoutingModule {}
