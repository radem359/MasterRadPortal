import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { BookService } from 'src/app/shared/services/book.service';
import { DialogService } from 'src/app/shared/services/dialog.service';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { UserService } from 'src/app/shared/services/user.service';
import { BookComponent } from '../book/book.component';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {

  listData: MatTableDataSource<any>;
  displayColumns: string[] = ['bookName', 'isbnNumber', 'bookDescription', 'authors', 'language', 'genres'];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  searchKey:string;

  constructor(
    private service: BookService,
    public userService: UserService,
    private dialog: MatDialog,
    private notificationService: NotificationService,
    private dialogService: DialogService
    ) { }

  ngOnInit(): void {
    if(this.userService.loggedUser.value.$id != null && !this.displayColumns.includes('user')){
      this.displayColumns.push('user');
    }
    
    if(this.userService.loggedUser.value.$id != null && 
      this.userService.loggedUser.value.isAdmin &&
      !this.displayColumns.includes('actions')){
      this.displayColumns.push('actions');
    }


    this.service.getBooks().subscribe(      
      data => {
        console.log("data", data);
        let array = data.map(item => {
          return {
            $id: item.id,
            bookName: item.bookName,
            bookDescription: item.bookDescription,
            isbnNumber: item.isbnNumber,
            authors: item.authors,
            language: item.language,
            genres: item.genres,
            user: item.user
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
    this.dialog.open(BookComponent,dialogConfig).afterClosed().subscribe(
      result => {
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
    this.dialog.open(BookComponent,dialogConfig).afterClosed().subscribe(
      result => {
        this.ngOnInit();
      }
    );
  }

  onDelete(id){
  this.dialogService.openConfirmDialog('Are you sure to delete this book?')
    .afterClosed().subscribe( res => {
      console.log(res);
      if(res){
        this.service.removeBook(id).subscribe(
          data =>{
            this.notificationService.warn('! Deleted successfully');
            this.ngOnInit();
          }
        );
      }
    });
  }
}
