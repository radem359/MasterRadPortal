import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Book } from 'src/app/shared/model/book';
import { Language } from 'src/app/shared/model/language';
import { CodebooksService } from 'src/app/shared/services/codebooks.service';
import { LanguageService } from 'src/app/shared/services/language.service';
import { NotificationService } from 'src/app/shared/services/notification.service';

@Component({
  selector: 'app-language',
  templateUrl: './language.component.html',
  styleUrls: ['./language.component.css']
})
export class LanguageComponent implements OnInit {

  cBooks: Book[];

  constructor(
    public service: LanguageService,
    private coodebooksService: CodebooksService,
    private notificationService: NotificationService,
    private dialogRef: MatDialogRef<LanguageComponent>
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
    let language = new Language();

    if(this.service.form.valid){
      language.languageName = this.service.form.value.languageName;
      language.books = this.service.form.value.books;


      if(this.service.form.value.$id){
        language.id = this.service.form.value.$id;
        this.service.updateLanguage(language).subscribe(
          data => {
            console.log(data);
            this.notificationService.success("Submited successfully");
          }
        );
      }else{
        this.service.saveLanguage(language).subscribe(
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
