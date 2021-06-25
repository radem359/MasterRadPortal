import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Author } from 'src/app/shared/model/author';
import { Nationality } from 'src/app/shared/model/nationality';
import { CodebooksService } from 'src/app/shared/services/codebooks.service';
import { NationalityService } from 'src/app/shared/services/nationality.service';
import { NotificationService } from 'src/app/shared/services/notification.service';

@Component({
  selector: 'app-nationality',
  templateUrl: './nationality.component.html',
  styleUrls: ['./nationality.component.css']
})
export class NationalityComponent implements OnInit {

  cAuthors: Author[];

  constructor(
    public service: NationalityService,
    private coodebooksService: CodebooksService,
    private notificationService: NotificationService,
    private dialogRef: MatDialogRef<NationalityComponent>
  ) { }

  ngOnInit(): void {
    this.readCodebooks();
  }

  private readCodebooks(){
    this.coodebooksService.getCodebook(['authors']).subscribe(
      data => {
        this.cAuthors = data['authors'];

        if(this.service.form.value.$id){

          var diffAuthors = [];
          for(var author in this.cAuthors){
            if(!this.service.form.value.authors.some(e => e.id == this.cAuthors[author].id)){
              diffAuthors.unshift(this.cAuthors[author]);
            }
          }
          this.cAuthors = diffAuthors.concat(this.service.form.value.authors);
        }

        console.log('cBooks', this.cAuthors);
      }
    );
  }
  

  onClear(): void{
    this.service.form.reset();
    this.service.initializeFormGroup();
  }
  
  onSubmit(): void{
    let nationality = new Nationality();

    if(this.service.form.valid){
      nationality.nationalityName = this.service.form.value.nationalityName;
      nationality.authors = this.service.form.value.authors;


      if(this.service.form.value.$id){
        nationality.id = this.service.form.value.$id;
        this.service.updateNationality(nationality).subscribe(
          data => {
            console.log(data);
            this.notificationService.success("Submited successfully");
          }
        );
      }else{
        this.service.saveNationality(nationality).subscribe(
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
