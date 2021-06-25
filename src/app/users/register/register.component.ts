import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/shared/model/user';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  message : string;

  constructor(
    public service: UserService,
    private router: Router
    ) { }

  ngOnInit(): void {
  }

  passwordMatch() : boolean{
    if(this.service.register.value.password != this.service.register.value.confirmPassword){
      this.message = "Passwords must match";
      return false;
    }

    this.message = "";
    return true;
  }

  onSubmit(): void{
    if(this.service.register.valid && this.passwordMatch()){
      var user = new User();
      user.id = null;
      user.isAdmin = false;
      user.username = this.service.register.value.username;
      user.password = this.service.register.value.password;
      user.books = [];

      this.service.saveUser(user).subscribe(
        data => {
          console.log(data);
          var obj = {
            $id: data.id,
            username: data.username,
            password: data.password,
            isAdmin: data.isAdmin,
            books: data.books
          }
          this.service.logInUser(obj);
          this.service.removeRegister();
          this.router.navigate(['Books']);
        }
      );
    }
  }
}
