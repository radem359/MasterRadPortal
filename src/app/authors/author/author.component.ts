import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Author } from 'src/app/shared/model/author';
import { Book } from 'src/app/shared/model/book';
import { Nationality } from 'src/app/shared/model/nationality';
import { AuthorService } from 'src/app/shared/services/author.service';
import { CodebooksService } from 'src/app/shared/services/codebooks.service';
import { NotificationService } from 'src/app/shared/services/notification.service';

@Component({
  selector: 'app-author',
  templateUrl: './author.component.html',
  styleUrls: ['./author.component.css']
})
export class AuthorComponent implements OnInit {

  cNationalities: Nationality[];
  cBooks: Book[];

  constructor(
    public service: AuthorService,
    private coodebooksService: CodebooksService,
    private notificationService: NotificationService,
    private dialogRef: MatDialogRef<AuthorComponent>
  ) { }

  ngOnInit(): void {
    this.readCodebooks();
  }

  private readCodebooks(){
    this.coodebooksService.getCodebook(['books', 'nationalities']).subscribe(
      data => {
        this.cNationalities = data['nationalities'];
        this.cBooks = data['books'];

        if(this.service.form.value.$id){

          var diffNationalities = [];
          for(var nationality in this.cNationalities){
            if(this.service.form.value.nationality.id != this.cNationalities[nationality].id){
              diffNationalities.unshift(this.cNationalities[nationality]);
            }
          }
          console.log(diffNationalities);
          this.cNationalities = diffNationalities.concat(this.service.form.value.nationality);

          var diffBooks = [];
          for(var book in this.cBooks){
            if(!this.service.form.value.books.some(e => e.id == this.cBooks[book].id)){
              diffBooks.unshift(this.cBooks[book]);
            }
          }
          this.cBooks = diffBooks.concat(this.service.form.value.books);
        }

        console.log('cNationalities', this.cNationalities);
        console.log('cBooks', this.cBooks);
      }
    );
  }

  onClear(): void{
    this.service.form.reset();
    this.service.initializeFormGroup();
  }

  onSubmit(): void{
    let author = new Author();

    if(this.service.form.valid){
      author.authorName = this.service.form.value.authorName;
      author.books = this.service.form.value.books;
      author.nationality = this.service.form.value.nationality;


      if(this.service.form.value.$id){
        author.id = this.service.form.value.$id;
        this.service.updateAuthor(author).subscribe(
          data => {
            console.log(data);
            this.notificationService.success("Submited successfully");
          }
        );
      }else{
        this.service.saveAuthor(author).subscribe(
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
