import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-new-member',
  templateUrl: './new-member.component.html',
  styleUrls: ['./new-member.component.css']
})
export class NewMemberComponent implements OnInit {

  member = {name: '', surname: '', email: '', phone: '' }

  constructor(
    private api: ApiService,
    private appComponent: AppComponent
    ) { }

  ngOnInit(): void {
  }

  save(){
    this.api.saveNewMember(this.member).subscribe(
      data => {
        this.appComponent.members.push(data);
       // this.selected_member = data;
      },
      error => {
        console.log("Aconteceu um erro")
      }
    )
  }

}
