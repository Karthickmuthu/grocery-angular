import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EventService } from 'src/app/shared/event.service';
import { GroceryComponent } from '../grocery/grocery.component';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { GroceryService } from 'src/app/services/grocery.service';

export interface PeriodicElement {
  id: number
  title: string;
  notes: string;
  purchased: boolean;

}
const ELEMENT_DATA: PeriodicElement[] =
  [
    {
      id: 1001,
      title: "item 1",
      notes: "notes for item1",
      purchased: false
    },
    {
      id: 1002,
      title: "item 2",
      notes: "notes for item2",
      purchased: true
    },
    {
      id: 1003,
      title: "item 3",
      notes: "notes for item3",
      purchased: true
    },
    {
      id: 1004,
      title: "item 4",
      notes: "notes for item4",
      purchased: false
    }
  ]

@Component({
  selector: 'app-grocery-list',
  templateUrl: './grocery-list.component.html',
  styleUrls: ['./grocery-list.component.css']
})

export class GroceryListComponent implements OnInit {
  dataSource: any;
  displayedColumns: any;
  constructor(private groceryService: GroceryService, private dialog: MatDialog, private eventService: EventService, private _snackBar: MatSnackBar) {
    this.dataSource = this.groceryService.getGroceryList();

    //this.refreshTable();

    this.displayedColumns = ['title', 'purchased'];

    this.eventService.getClickEvent().subscribe((data) => {

      if (data.id) {
        this.groceryService.updateGrocery(data)
          .subscribe(
            (res: any) => {
              this.refreshTable();
              this.dialog.closeAll();
              this._snackBar.open('item updated successfully', 'Close', {
                duration: 3000,
                panelClass: ['blue-snackbar'],
                verticalPosition: 'top'
              });
            });
      }
      else {
        this.groceryService.addGroceryItem(data)
          .subscribe(
            (res: any) => {
              this.refreshTable();
              this.dialog.closeAll();
              this._snackBar.open('item added successfully', 'Close', {
                duration: 3000,
                panelClass: ['blue-snackbar'],
                verticalPosition: 'top'
              });
            });
      }


    })



  }

  ngOnInit(): void {
  }

  updateStatus(data: any): void {
    if (data.purchased) {
      data.purchased = false
    }
    else {
      data.purchased = true
    }
    this.groceryService.updateGroceryPurchased(data)
      .subscribe(
        (res: any) => {
          this.refreshTable();
          this.dialog.closeAll();
          this._snackBar.open('Purchased updated successfully', 'Close', {
            duration: 3000,
            panelClass: ['blue-snackbar'],
            verticalPosition: 'top'
          });
        });
  }
  addItem(): void {
    const dialogRef = this.dialog.open(GroceryComponent, {
      width: '350px',
    });

    dialogRef.afterClosed().subscribe(res => {
      console.log('The dialog was closed');
    });
  }
  refreshTable(): void {
    this.groceryService.getGroceryList()
      .subscribe(
        (res: any) => {
          console.log('', res);
          this.dataSource = res;
        });
  }
  editItem(data: any): void {
    console.log(data);
    const dialogRef = this.dialog.open(GroceryComponent, {
      width: '350px',
      data: data
    });
  }


}
