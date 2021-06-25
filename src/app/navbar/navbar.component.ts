import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { UserService } from '../shared/services/user.service';
import { UserComponent } from '../users/user/user.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {


  constructor(
    public service: UserService,
    private dialog: MatDialog,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  toUser(){
    this.service.populateForm(this.service.loggedUser.value);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    this.dialog.open(UserComponent,dialogConfig).afterClosed().subscribe(
      result => {
        console.log("onEdit result", result);
        this.ngOnInit();
      }
    );
  }

  logOut(): void{
    this.service.logOut();
    this.router.navigate(['LogIn']);
  }

}
