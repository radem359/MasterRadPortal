import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { MaterialModule } from './material/material.module';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './navbar/navbar.component';
import { HttpClientModule } from '@angular/common/http';
import { BsModalService, ModalModule } from 'ngx-bootstrap/modal';
import { BooksComponent } from './books/books.component';
import { BookComponent } from './books/book/book.component';
import { BookService } from './shared/services/book.service';
import { AuthorService } from './shared/services/author.service';
import { LanguageService } from './shared/services/language.service';
import { GenreService } from './shared/services/genre.service';
import { NationalityService } from './shared/services/nationality.service';
import { UserService } from './shared/services/user.service';
import { BookListComponent } from './books/book-list/book-list.component';
import { MatConfirmDialogComponent } from './shared/mat-confirm-dialog/mat-confirm-dialog.component';
import { AuthorsComponent } from './authors/authors.component';
import { AuthorListComponent } from './authors/author-list/author-list.component';
import { AuthorComponent } from './authors/author/author.component';
import { LanguagesComponent } from './languages/languages.component';
import { LanguageListComponent } from './languages/language-list/language-list.component';
import { LanguageComponent } from './languages/language/language.component';
import { GenresComponent } from './genres/genres.component';
import { GenreListComponent } from './genres/genre-list/genre-list.component';
import { GenreComponent } from './genres/genre/genre.component';
import { NationalitiesComponent } from './nationalities/nationalities.component';
import { NationalityListComponent } from './nationalities/nationality-list/nationality-list.component';
import { NationalityComponent } from './nationalities/nationality/nationality.component';
import { UsersComponent } from './users/users.component';
import { UserListComponent } from './users/user-list/user-list.component';
import { UserComponent } from './users/user/user.component';
import { LogInComponent } from './users/log-in/log-in.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RegisterComponent } from './users/register/register.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    BooksComponent,
    BookComponent,
    BookListComponent,
    MatConfirmDialogComponent,
    AuthorsComponent,
    AuthorListComponent,
    AuthorComponent,
    LanguagesComponent,
    LanguageListComponent,
    LanguageComponent,
    GenresComponent,
    GenreListComponent,
    GenreComponent,
    NationalitiesComponent,
    NationalityListComponent,
    NationalityComponent,
    UsersComponent,
    UserListComponent,
    UserComponent,
    LogInComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    MaterialModule,
    HttpClientModule,
    ReactiveFormsModule,
    [ModalModule.forRoot()],
    FlexLayoutModule
  ],
  providers: [
    BsModalService, 
    BookService, 
    AuthorService, 
    LanguageService, 
    GenreService,
    NationalityService,
    UserService
  ],
  bootstrap: [AppComponent],
  entryComponents:[BookComponent, MatConfirmDialogComponent]
})
export class AppModule { }
