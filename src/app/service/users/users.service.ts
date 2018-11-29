import { Injectable } from '@angular/core';
import { RequestService } from "../request/request.service";
import {TeamsService} from "../teams/teams.service";

export interface User {
    id: string,
    name: string,
    surname: string,
    age: number,
    email: string,
    avatar: string,
    type: string,
    teamLeaderOf?: string,
    developers?: EnumUsers,
    teamName?: string,
    avalible?: boolean,
    icon?: string
}
export interface EnumUsers extends Array<User>{}

@Injectable({
  providedIn: 'root'
})

export class UsersService {

    constructor(private request: RequestService, private teamsService: TeamsService) {}

    private Users = <EnumUsers> [];
    private UsersNoTeam = <EnumUsers> [];
    private needRefresh: boolean = false;

    public async getAllUsers(){
        const dataUser = <EnumUsers> await this.request.getAllUsers();
        this.Users = await this.setDevelopersToTeamLeader(dataUser);
        return this.Users = await this.setTypeUser(this.Users);
    }

    private async setDevelopersToTeamLeader (data: EnumUsers) {
        const pArray = data.map(async user => {
            if(user.teamLeaderOf){
                user.developers = <EnumUsers> await this.getDevelopersByTeamLeaderID(user.id);
                user.teamName = this.teamsService.getNameByID(user.teamLeaderOf);
            }
            return user;
        });
        return await Promise.all(pArray);
    }

    private async setTypeUser (data: EnumUsers) {
        const pArray = data.map(async user => {
            const typeDeveloper = this.getTypeDeveloper(user.id);
            if(!typeDeveloper && !user.teamLeaderOf) this.setUserAvailable(user);
            user.icon = (typeDeveloper == "Backend") ? 'laptop' : (typeDeveloper == "Frontend") ? 'logo-javascript' : 'person';
            return user;
        });
        return await Promise.all(pArray);
    }

    public getUserByID(id){
        return <User> this.Users.find(x => x.id == id);
    }

    public setUserAvailable(user){
        let index = this.UsersNoTeam.map(function(item) { return item.id; }).indexOf(user.id);
        if(index == -1){
            this.needRefresh = true;
            this.UsersNoTeam.push(user)
        }
    }

    public setUserNotAvailable(id){
        let removeIndex = this.UsersNoTeam.map(function(item) { return item.id; }).indexOf(id);
        if(removeIndex > -1){
            this.needRefresh = true;
            this.UsersNoTeam.splice(removeIndex, 1);
        }
    }

    public getTypeDeveloper(id){
        for (let user of this.Users) {
            if(user.developers && user.teamName)
                if(user.developers.find(x => x.id == id)) return user.teamName;
        }
    }

    public getUsersNoTeam(){
        const usersAvailable = [];
        for (let user of this.UsersNoTeam) {
            usersAvailable.push({
                name: user.name,
                type: 'radio',
                label: user.name+" "+user.surname,
                value: user.id,
            })
        }
        return usersAvailable;
    }

    public async getDevelopersByTeamLeaderID(id){
        return <EnumUsers> await this.request.getDevelopersByTeamLeaderID(id);
    }

    public async deleteUserByID(id){
        return await this.request.deleteUser(id);
    }

    public getRefreshUsers(){
        const data = this.needRefresh;
        this.needRefresh = false;
        return data;
    }

    public async editUserData(id, data){
        return await this.request.editUserData(id, data);
    }

    public async addUserData(data){
        return await this.request.addUserData(data);
    }

    public async deleteDevelopersByTeamLeaderID(idTeamLeader, idDeveloper){
        return await this.request.deleteDevelopersByTeamLeaderID(idTeamLeader, idDeveloper);
    }

    public async addDevelopersByTeamLeaderID(idTeamLeader, idDeveloper){
        return await this.request.addDevelopersByTeamLeaderID(idTeamLeader, idDeveloper);
    }
}
