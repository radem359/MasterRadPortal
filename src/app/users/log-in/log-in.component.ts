import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {

  constructor(
    public service: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
    console.log('loggedUser',this.service.loggedUser.value);
  }

  onSubmit(): void{
    console.log('tryLog',this.service.tryLog.value);
    if(this.service.tryLog.valid){
      this.service.logIn(this.service.tryLog.value.username, this.service.tryLog.value.password).subscribe(
        data => {
          var obj = {
            $id: data.id,
            username: data.username,
            password: data.password,
            isAdmin: data.isAdmin,
            books: data.books
          }
          this.service.logInUser(obj);
          this.service.deleteTryLog();
          this.router.navigate(['Books']);
        }
      );
    }
  }
}
