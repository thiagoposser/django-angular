import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { ApiService } from './api.service';
import { AppComponent } from '../app.component';
import { threadId } from 'worker_threads';

@Component({
  selector: 'app-members-detail',
  templateUrl: './members-detail.component.html',
  styleUrls: ['./members-detail.component.css']
})
export class MembersDetailComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private api: ApiService,
    private router: Router,
    private appComponet: AppComponent
    ) { }

  selected_member = { name: '', surname: '' } ;
  selectedId: any;

  ngOnInit() {
    this.route.paramMap.subscribe((param: ParamMap) => {
      let id = parseInt(param.get('id')!);
      this.selectedId = id
      this.loadMember(id);
    });
  }

  newMember(){
    this.router.navigate(['new-member'])
  }

  update(){
    this.api.updateMember(this.selected_member).subscribe(
      data => {
        this.selected_member = data;
      },
      error => {
        console.log("Aconteceu um erro")
      }
    )
  }

  deleteM() {
    this.api.deleteMember(this.selectedId).subscribe(
      data => {
        let index: any;

        this.appComponet.members.forEach((e, i) =>{
          if(e.id == this.selectedId)
          index = i;
        });

        this.appComponet.members.splice(index, 1)
      },
      error => {
        console.log("Aconteceu um erro")
      }
    );
  };

  loadMember(id: any) {
      this.api.getMember(id).subscribe(
        data => {
          this.selected_member = data;
        },
        error => {
          console.log("Aconteceu um erro")
        }
      )
      
    }
  }

