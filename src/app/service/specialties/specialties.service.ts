import { Injectable } from '@angular/core';
import {RequestService} from "../request/request.service";

export interface Specialties {
    id: string,
    name: string
}

export interface EnumSpecialties extends Array<Specialties>{}

@Injectable({
  providedIn: 'root'
})
export class SpecialtiesService {

    constructor(private request: RequestService) {}

    private Specialties = [];

    public async getAllSpecialties(){
        return this.Specialties = <EnumSpecialties> await this.request.getAllSpecialties();
    }

    public getSpecialtyByID(id){
        return <Specialties> this.Specialties.find(x => x.id == id);
    }

    public async getSpecialtiesByUserID(id){
        return <EnumSpecialties> await this.request.getSpecialtiesByUserID(id);
    }

    public async deleteSpecialtyByID(id){
        return await this.request.deleteSpecialtyByID(id);
    }

    public async editSpecialtyData(id, data){
        return await this.request.editSpecialtyData(id, data);
    }

    public async addSpecialtyData(data){
        return await this.request.addSpecialtyData(data);
    }

    public async deleteSpecialtiesByUserID(idDeveloper, idSpecialty){
        return await this.request.deleteSpecialtiesByUserID(idDeveloper, idSpecialty);
    }

    public async addSpecialtiesByUserID(idDeveloper, idSpecialty){
        return await this.request.addSpecialtiesByUserID(idDeveloper, idSpecialty);
    }

    public getSpecialtiesToAddUser(userSpecialties){
        const specialtiesAvailable = [];
        for (let specialty of this.Specialties) {
            let index = userSpecialties.map(function(item) { return item.id; }).indexOf(specialty.id);
            if(index == -1)
                specialtiesAvailable.push({
                    name: specialty.name,
                    type: 'radio',
                    label: specialty.name,
                    value: specialty.id,
                })
        }
        return specialtiesAvailable;
    }
}
