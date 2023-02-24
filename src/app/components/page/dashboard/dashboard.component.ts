import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ITeam } from 'src/app/interfaces/team';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit{


  teamForm:FormGroup =  new FormGroup({});

  teams:ITeam[] = [];

  constructor(private formBuilder: FormBuilder,private store:StoreService) {

    this.teamForm = this.formBuilder.group({
      name:['',Validators.required],
      quantity_players:[12,Validators.required],
    })
  }

  ngOnInit() {
    this.store.getTeams().subscribe(teams => {
      console.log("teams",teams)
      this.teams = teams;
    });
  }

  deleteAll = () => this.store.deleteAllTeams();
  onSubmit = () => {
    console.log("form value", this.teamForm.value);

    if(this.teamForm.invalid){
      alert("Nombre del equipo es requerido");
      return;
    }

    let team:ITeam = {
      id: 0,
      name:this.teamForm.controls['name'].value,
      description:'',
      image:'',
      players:[]
    };

    this.store.addTeam(team);
    this.teamForm.patchValue(
      {
        "name": "",
        "quantity_players": 12
      }
    )
  }
}
