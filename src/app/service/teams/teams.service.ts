import { Injectable } from '@angular/core';
import { RequestService } from "../request/request.service";

export interface Teams {
    id: string,
    name: string
}

export interface EnumTeams extends Array<Teams>{}

@Injectable({
  providedIn: 'root'
})

export class TeamsService {

  constructor(private request: RequestService) {}

  private Teams = [];

  public async initTeams(){
    return await this.request.getTeams().then(teams => this.setTeams(teams)).catch( () => this.setTeams([]));
  }

  public getTeams(){
    return <EnumTeams> this.Teams;
  }

  private setTeams(teams){
    this.Teams = <EnumTeams> teams;
  }

  public getNameByID(id){
    return this.Teams.find(x => x.id == id).name;
  }
}
