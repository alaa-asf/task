import { MyServiceService } from './Shared/my-service.service';
import { Component, OnInit, Output } from '@angular/core';
import { MessageService } from 'primeng/api';
import { FormBuilder, FormGroup } from '@angular/forms';
import {EventEmitter} from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [MessageService],
})
export class AppComponent implements OnInit {
  @Output() pageingValue = new EventEmitter();
  public myData: any;
  public displayEdit = false;
  public formData: FormGroup;
  public totalRecords: any;
  constructor(
    private myser: MyServiceService,
    private messageService: MessageService,
    private formBuilder: FormBuilder
  ) {
    this.formData = this.formBuilder.group({
      name: [''],
      username: [''],
      email: [''],
      city: [''],
      phone: [''],
      website: [''],
      company: [''],
    });
  }

  ngOnInit() {
    this.getData();
  }

  public getData() {
    this.myser.getData().subscribe((data) => {
      this.totalRecords = Object.keys(data).length;
      this.myData = data;
    });
  }

  onClickEdit(value: any) {
    this.displayEdit = true;
    this.formData.controls['name'].setValue(value.name);
    this.formData.controls['email'].setValue(value.email);
    this.formData.controls['phone'].setValue(value.phone);
    this.formData.controls['username'].setValue(value.username);
    this.formData.controls['website'].setValue(value.website);
    this.formData.controls['company'].setValue(value.company.name);
    this.formData.controls['city'].setValue(value.address.city);
  }

  onClickDelete(id: any) {
    this.myser.deleteData(id).subscribe((data) => {
      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: 'Element Deleted',
      });
      this.getData();
    });
  }

  onSubmit(data: any) {
    // this.myser.updateData(data).subscribe(data =>{
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: 'Element Edited',
    });
    this.getData();
    // })
  }

  ngOnChanges() {

  }

  onPageChange(event: any) {
    this.pageingValue.emit(event.page);
  }
}
