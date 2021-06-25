import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AuthorService } from 'src/app/shared/services/author.service';
import { DialogService } from 'src/app/shared/services/dialog.service';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { UserService } from 'src/app/shared/services/user.service';
import { AuthorComponent } from '../author/author.component';

@Component({
  selector: 'app-author-list',
  templateUrl: './author-list.component.html',
  styleUrls: ['./author-list.component.css']
})
export class AuthorListComponent implements OnInit {
  
  listData: MatTableDataSource<any>;
  displayColumns: string[] = ['authorName', 'nationality', 'books'];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  searchKey:string;
  
  constructor(
    private service: AuthorService,
    public userService: UserService,
    private dialog: MatDialog,
    private notificationService: NotificationService,
    private dialogService: DialogService
  ) { }

  ngOnInit(): void {
    if(this.userService.loggedUser.value.$id != null && 
      this.userService.loggedUser.value.isAdmin && 
      !this.displayColumns.includes('actions')){
      this.displayColumns.push('actions');
    }

    this.service.getAuthors().subscribe(
      data => {
        console.log('data',data);
        let array = data.map(item => {
          return {
            $id: item.id,
            authorName: item.authorName,
            nationality: item.nationality,
            books: item.books,
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
    this.dialog.open(AuthorComponent,dialogConfig).afterClosed().subscribe(
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
    this.dialog.open(AuthorComponent,dialogConfig).afterClosed().subscribe(
      result => {
        console.log("onEdit result", result);
        this.ngOnInit();
      }
    );
  }

  onDelete(id){
    this.dialogService.openConfirmDialog('Are you sure to delete this author?')
      .afterClosed().subscribe( res => {
        console.log(res);
        if(res){
          this.service.removeAuthor(id).subscribe(
            data =>{
              this.notificationService.warn('! Deleted successfully');
              this.ngOnInit();
            }
          );
        }
      });
    }
}
