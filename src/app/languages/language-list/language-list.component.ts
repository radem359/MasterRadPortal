import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DialogService } from 'src/app/shared/services/dialog.service';
import { LanguageService } from 'src/app/shared/services/language.service';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { UserService } from 'src/app/shared/services/user.service';
import { LanguageComponent } from '../language/language.component';

@Component({
  selector: 'app-language-list',
  templateUrl: './language-list.component.html',
  styleUrls: ['./language-list.component.css']
})
export class LanguageListComponent implements OnInit {


  listData: MatTableDataSource<any>;
  displayColumns: string[] = ['languageName', 'books'];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  searchKey:string;

  constructor(
    private service: LanguageService,
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

    this.service.getLanguages().subscribe(
      data => {
        console.log('data',data);
        let array = data.map(item => {
          return {
            $id: item.id,
            languageName: item.languageName,
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
    this.dialog.open(LanguageComponent,dialogConfig).afterClosed().subscribe(
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
    this.dialog.open(LanguageComponent,dialogConfig).afterClosed().subscribe(
      result => {
        console.log("onEdit result", result);
        this.ngOnInit();
      }
    );
  }

  onDelete(id){
    this.dialogService.openConfirmDialog('Are you sure to delete this language?')
      .afterClosed().subscribe( res => {
        console.log(res);
        if(res){
          this.service.removeLanguage(id).subscribe(
            data =>{
              this.notificationService.warn('! Deleted successfully');
              this.ngOnInit();
            }
          );
        }
      });
    }
}
