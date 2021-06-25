import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DialogService } from 'src/app/shared/services/dialog.service';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { UserService } from 'src/app/shared/services/user.service';
import { UserComponent } from '../user/user.component';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  listData: MatTableDataSource<any>;
  displayColumns: string[] = ['username', 'isAdmin', 'books', 'actions'];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  searchKey:string;

  constructor(
    private service: UserService,
    private dialog: MatDialog,
    private notificationService: NotificationService,
    private dialogService: DialogService
  ) { }

  ngOnInit(): void {
    this.service.getUsers().subscribe(
      data => {
        console.log('data',data);
        let array = data.map(item => {
          return {
            $id: item.id,
            username: item.username,
            password: item.password,
            isAdmin: item.isAdmin,
            books: item.books
          };
        });
        this.listData = new MatTableDataSource(array);
        this.listData.sort = this.sort;
        this.listData.paginator = this.paginator;
        this.listData.filterPredicate = (data, filter) => {
          return this.displayColumns.some(ele => {
            return ele != 'actions' && data[ele].toString().toLowerCase().indexOf(filter) != -1;
          });
        };
      }
    );
  }

  onSearchClear() {
    this.searchKey = "";
    this.applyFilter();
  }

  applyFilter() {
    this.listData.filter = this.searchKey.trim().toLowerCase();
  }
  
  onCreate() {
    this.service.initializeFormGroup();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    this.dialog.open(UserComponent,dialogConfig).afterClosed().subscribe(
      result => {
        console.log("onCreate result", result);
        this.ngOnInit();
      }
    );
  }

  onEdit(row){
    this.service.populateForm(row);
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

  onDelete(id){
    this.dialogService.openConfirmDialog('Are you sure to delete this user?')
      .afterClosed().subscribe( res => {
        console.log(res);
        if(res){
          this.service.removeUser(id).subscribe(
            data =>{
              this.notificationService.warn('! Deleted successfully');
              this.ngOnInit();
            }
          );
        }
      });
    }
}
