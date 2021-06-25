import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Book } from 'src/app/shared/model/book';
import { User } from 'src/app/shared/model/user';
import { CodebooksService } from 'src/app/shared/services/codebooks.service';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  cBooks: Book[];
  
  constructor(
    public service: UserService,
    private coodebooksService: CodebooksService,
    private notificationService: NotificationService,
    private dialogRef: MatDialogRef<UserComponent>
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
    let user = new User();

    if(this.service.form.valid){
      user.username = this.service.form.value.username;
      user.password = this.service.form.value.password;
      user.isAdmin = this.service.form.value.isAdmin;
      user.books = this.service.form.value.books;


      if(this.service.form.value.$id){
        user.id = this.service.form.value.$id;
        this.service.updateUser(user).subscribe(
          data => {
            console.log(data);
            this.notificationService.success("Submited successfully");
          }
        );
      }else{
        this.service.saveUser(user).subscribe(
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
