import { Component, EventEmitter, Inject, OnInit, Optional, Output } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EventService } from 'src/app/shared/event.service';

@Component({
  selector: 'app-grocery',
  templateUrl: './grocery.component.html',
  styleUrls: ['./grocery.component.css']
})
export class GroceryComponent implements OnInit {
  title: string = "";
  notes: string = "";
  errorTitle: boolean = false;
  errorNotes: boolean = false;
  saveClick: boolean = true;
  updateData:any;

  constructor(private eventService: EventService, @Optional() @Inject(MAT_DIALOG_DATA) public data: any) {
    if(data){
      this.title= data.title;
      this.notes= data.notes;
      this.updateData = data;
      this.saveClick =false;
    }else
    {
      this.saveClick =true;
    }
    
  }

  ngOnInit(): void {

  }
  onSaveClick(): void {
    this.validateFields();
    if (this.errorTitle == true) {
      return;
    }
    let data = {
      title: this.title,
      notes: this.notes,      
    }
    this.eventService.sendClickEvent(data);
  }
  onUpdateClick(): void {
    this.validateFields();
    if (this.errorTitle == true) {
      return;
    }
    let data = {
      id:this.updateData.id,
      purchased:this.updateData.purchased,
      title: this.title,
      notes: this.notes,  

    }
    console.log("final data",data)
    this.eventService.sendClickEvent(data);
  }
  onKeyPress(flag: number) {
    if (flag == 1) {
      if (!this.title) {
        this.errorTitle = true
      }
      else {
        this.errorTitle = false;
      }
    }

  }
  validateFields() {
    if (!this.title) {
      this.errorTitle = true
    }
    else {
      this.errorTitle = false;
    }


  }
}
