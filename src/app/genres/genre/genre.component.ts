import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Book } from 'src/app/shared/model/book';
import { Genre } from 'src/app/shared/model/genre';
import { CodebooksService } from 'src/app/shared/services/codebooks.service';
import { GenreService } from 'src/app/shared/services/genre.service';
import { NotificationService } from 'src/app/shared/services/notification.service';

@Component({
  selector: 'app-genre',
  templateUrl: './genre.component.html',
  styleUrls: ['./genre.component.css']
})
export class GenreComponent implements OnInit {

  cBooks: Book[];

  constructor(
    public service: GenreService,
    private coodebooksService: CodebooksService,
    private notificationService: NotificationService,
    private dialogRef: MatDialogRef<GenreComponent>
  ) { }

  ngOnInit(): void {
    this.readCodebooks();
  }

  private readCodebooks(){
    this.coodebooksService.getCodebook(['books']).subscribe(
      data => {
        this.cBooks = data['books'];

        if(this.service.form.value.$id){

          var diffBooks = [];
          for(var book in this.cBooks){
            if(!this.service.form.value.books.some(e => e.id == this.cBooks[book].id)){
              diffBooks.unshift(this.cBooks[book]);
            }
          }
          this.cBooks = diffBooks.concat(this.service.form.value.books);
        }

        console.log('cBooks', this.cBooks);
      }
    );
  }

  onClear(): void{
    this.service.form.reset();
    this.service.initializeFormGroup();
  }

  onSubmit(): void{
    let genre = new Genre();

    if(this.service.form.valid){
      genre.genreName = this.service.form.value.genreName;
      genre.books = this.service.form.value.books;


      if(this.service.form.value.$id){
        genre.id = this.service.form.value.$id;
        this.service.updateGenre(genre).subscribe(
          data => {
            console.log(data);
            this.notificationService.success("Submited successfully");
          }
        );
      }else{
        this.service.saveGenre(genre).subscribe(
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
