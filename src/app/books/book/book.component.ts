import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Author } from 'src/app/shared/model/author';
import { Book } from 'src/app/shared/model/book';
import { Genre } from 'src/app/shared/model/genre';
import { Language } from 'src/app/shared/model/language';
import { User } from 'src/app/shared/model/user';
import { BookService } from 'src/app/shared/services/book.service';
import { CodebooksService } from 'src/app/shared/services/codebooks.service';
import { NotificationService } from 'src/app/shared/services/notification.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {

  cAuthors: Author[];
  cGenres: Genre[];
  cLanguages: Language[];
  cUsers: User[];

  constructor(
    public service: BookService,
    private coodebooksService: CodebooksService,
    private notificationService: NotificationService,
    private dialogRef: MatDialogRef<BookComponent>) { }

  ngOnInit(): void {
    this.readCodebooks();
  }
  
  private readCodebooks(){

    this.coodebooksService.getCodebook(['authors', 'genres', 'languages', 'users']).subscribe(
      data => {
        this.cAuthors = data['authors'];
        this.cGenres = data['genres'];
        this.cLanguages = data['languages'];
        this.cUsers = data['users'];
        
        if(this.service.form.value.$id){

          var diffUsers = [];
          for(var user in this.cUsers){
            if(this.service.form.value.user.id != this.cUsers[user].id){
              diffUsers.unshift(this.cUsers[user]);
            }
          }
          console.log(diffUsers);
          this.cUsers = diffUsers.concat(this.service.form.value.user);
                    
          var diffLanguages = [];
          for(var language in this.cLanguages){
            if(this.service.form.value.language.id != this.cLanguages[language].id){
              diffLanguages.unshift(this.cLanguages[language]);
            }
          }
          this.cLanguages = diffLanguages.concat(this.service.form.value.language);

          var diffAuthors = [];
          for(var author in this.cAuthors){
            if(!this.service.form.value.authors.some(e => e.id == this.cAuthors[author].id)){
              diffAuthors.unshift(this.cAuthors[author]);
            }
          }
          this.cAuthors = this.service.form.value.authors.concat(diffAuthors);

          var diffGenres = [];
          for(var genre in this.cGenres){
            if(!this.service.form.value.genres.some(e => e.id == this.cGenres[genre].id)){
              diffGenres.unshift(this.cGenres[genre]);
            }
          }
          this.cGenres = this.service.form.value.genres.concat(diffGenres);
        }

        console.log('cAuthors', this.cAuthors);
        console.log('cGenres', this.cGenres);
        console.log('cLanguages', this.cLanguages);
        console.log('cUsers', this.cUsers);
        
      }
    );
  }

  onClear(): void{
    this.service.form.reset();
    this.service.initializeFormGroup();
  }

  onSubmit(): void{
    let book = new Book();

    if(this.service.form.valid){
      book.bookName = this.service.form.value.bookName;
      book.isbnNumber = this.service.form.value.isbnNumber;
      book.bookDescription = this.service.form.value.bookDescription;
      book.authors = this.service.form.value.authors;
      book.language = this.service.form.value.language;
      book.genres = this.service.form.value.genres;
      book.user = this.service.form.value.user;


      if(this.service.form.value.$id){
        book.id = this.service.form.value.$id;
        this.service.updateBook(book).subscribe(
          data => {
            console.log(data);
            this.notificationService.success("Submited successfully");
          }
        );
      }else{
        this.service.saveBook(book).subscribe(
          data => {
            console.log(data);
            this.notificationService.success("Submited successfully");
          }
        );
      }
      
      this.service.form.reset();
      this.service.initializeFormGroup();
      this.onClose();
    }else{
      console.log('its not valid form')
    }
  }

  onClose(){
    this.service.form.reset();
    this.service.initializeFormGroup();
    this.dialogRef.close();
  }

}
