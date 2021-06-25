import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthorsComponent } from './authors/authors.component';
import { BooksComponent } from './books/books.component';
import { GenresComponent } from './genres/genres.component';
import { LanguagesComponent } from './languages/languages.component';
import { NationalitiesComponent } from './nationalities/nationalities.component';
import { LogInComponent } from './users/log-in/log-in.component';
import { RegisterComponent } from './users/register/register.component';
import { UserComponent } from './users/user/user.component';
import { UsersComponent } from './users/users.component';

const routes: Routes = [
  {
    path: 'Books',
    component: BooksComponent
  },
  {
    path: 'Authors',
    component: AuthorsComponent
  },
  {
    path: 'Languages',
    component: LanguagesComponent
  },
  {
    path: 'Genres',
    component: GenresComponent
  },
  {
    path: 'Nationalities',
    component: NationalitiesComponent
  },
  {
    path: 'Users',
    component: UsersComponent
  },
  {
    path: 'LogIn',
    component: LogInComponent
  },
  {
    path: 'User',
    component: UserComponent
  },
  {
    path: 'Register',
    component: RegisterComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
