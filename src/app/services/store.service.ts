import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ITeam } from '../interfaces/team';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  initialState:ITeam[] = [
    {
      id:1,
      name:'Equipo Default',
      description:'',
      image:'',
      players:[]
    }
  ];

  private teams$ = new BehaviorSubject<ITeam[]>(this.initialState);
  constructor() { 
    let teamsStorage = localStorage.getItem('teams');
    if(teamsStorage) {
      this.teams$.next(JSON.parse(teamsStorage));
    }
  }


  getTeams = () => this.teams$.asObservable();

  setTeams = (teams:ITeam[]) => {
    this.teams$.next([...teams]);
    if(teams.length > 0){
      localStorage.setItem('teams',JSON.stringify(teams));
    }
  }

  addTeam = (teamParam:ITeam) => {
    let teamsList = this.teams$.getValue();
    let team:any = teamsList.find(team => team.name === teamParam.name);
    if(team){
      alert("Ya existe un equipo con el mismo nombre");
    }else{
      teamParam.id = Math.floor(Math.random() * 1000000000);
      this.setTeams([...teamsList,teamParam]);
    }
  }

  deleteAllTeams() {
    this.setTeams([]);
    this.deleteFixture();
  }

  deleteFixture = () => localStorage.removeItem('fixture');
  getFixture = () => {
    let fixture = localStorage.getItem('fixture');
    console.log("fixture",fixture);
    if(fixture){
      return JSON.parse(fixture);
    }

    return null;
  };

  saveFixture = (fixture:any) => localStorage.setItem('fixture',JSON.stringify(fixture));

}
