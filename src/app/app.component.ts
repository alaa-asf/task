import { MyServiceService } from './Shared/my-service.service';
import { Component, OnInit } from '@angular/core';
import {MessageService} from 'primeng/api';
import { FormBuilder, FormGroup } from '@angular/forms';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers:[MessageService]
})
export class AppComponent implements OnInit {
  public myData:any;
  public displayEdit=false;
  public formData: FormGroup;

  constructor(
    private myser:MyServiceService,
    private messageService:MessageService,
    private formBuilder:FormBuilder
  ) {
    this.formData=this.formBuilder.group({
      name:[''],
      username:[''],
      email:[''],
      city:[''],
      phone:[''],
      website:[''],
      company:['']
    })

  }

  ngOnInit(){
    this.getData();
  }

  public getData(){
    this.myser.getData().subscribe(data =>{
      this.myData=data;
      console.log(data);
    });
  }

  onClickEdit(value:any) {
    this.displayEdit=true;
    console.log(value);
    console.log(this.formData.controls);
    this.formData.controls=value
    // this.formData=Object.assign({}, value);
    // this.formData.controls['name'].setValue(value.name);
    // this.EditStatus = true;
    // this.Editdata = value
  }

  onClickDelete(id:any) {
    this.myser.deleteData(id).subscribe(data=>{
      this.messageService.add({severity:'success', summary: 'Success', detail: 'Element Deleted'});
      this.getData();
    })
  }

  onSubmit(data:any){

  }

}
