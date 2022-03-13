import { MyServiceService } from './Shared/my-service.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public myData:any;


  constructor(
    private myser:MyServiceService,
  ) {

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
    // this.EditStatus = true;
    // this.Editdata = value
  }

  onClickDelete(id:any) {
    this.myser.deleteData(id).subscribe(data=>{
      this.getData();
    })
  }

}
