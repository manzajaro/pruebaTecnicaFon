import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  constructor(private http: HttpClient) {}

  private urlBase: String = "http://192.168.99.100:3000";

  /** TEAMS REQUEST **/
  public async getTeams(){
    try {return await this.http.get(`${this.urlBase}/teams`).toPromise();} catch(e) {throw Error("")}
  }

  /** USERS REQUEST **/
  public async getAllUsers(){
    try {return await this.http.get(`${this.urlBase}/users`).toPromise();} catch(e) {throw Error("")}
  }

  public async getUserByID(id){
    try {return await this.http.get(`${this.urlBase}/users/${id}`).toPromise();} catch(e) {throw Error("")}
  }

  public async deleteUser(id){
    try {return await this.http.delete(`${this.urlBase}/users/${id}`).toPromise();} catch(e) {throw Error("")}
  }

  public async editUserData(id, data){
    try {return await this.http.put(`${this.urlBase}/users/${id}`, data).toPromise();} catch(e) {throw Error("")}
  }

  public async addUserData(data){
    try {return await this.http.post(`${this.urlBase}/users/`, data).toPromise();} catch(e) {throw Error("")}
  }

  /** SPECIALTIES DEVELOPERS REQUEST **/

  public async getSpecialtiesByUserID(id){
    try {return await this.http.get(`${this.urlBase}/users/${id}/specialties/`).toPromise();} catch(e) {throw Error("")}
  }

  public async deleteSpecialtiesByUserID(idDeveloper, idSpecialty){
    try {return await this.http.delete(`${this.urlBase}/users/${idDeveloper}/specialties/${idSpecialty}`).toPromise();} catch(e) {throw Error("")}
  }

  public async addSpecialtiesByUserID(idDeveloper, idSpecialty){
    try {return await this.http.post(`${this.urlBase}/users/${idDeveloper}/specialties/`,{id:idSpecialty}).toPromise();} catch(e) {throw Error("")}
  }

  /** DEVELOPERS REQUEST **/
  public async getDevelopersByTeamLeaderID(id){
    try {return await this.http.get(`${this.urlBase}/users/${id}/developers/`).toPromise();} catch(e) {throw Error("")}
  }

  public async deleteDevelopersByTeamLeaderID(idTeamLeader, idDeveloper){
    try {return await this.http.delete(`${this.urlBase}/users/${idTeamLeader}/developers/${idDeveloper}`).toPromise();} catch(e) {throw Error("")}
  }

  public async addDevelopersByTeamLeaderID(idTeamLeader, idDeveloper){
      try {return await this.http.post(`${this.urlBase}/users/${idTeamLeader}/developers/`,{id:idDeveloper}).toPromise();} catch(e) {throw Error("")}
  }

  /** SPECIALTIES REQUEST **/
  public async getAllSpecialties(){
    try {return await this.http.get(`${this.urlBase}/specialties/`).toPromise();} catch(e) {throw Error("")}
  }

  public async deleteSpecialtyByID(id){
    try {return await this.http.delete(`${this.urlBase}/specialties/${id}`).toPromise();} catch(e) {throw Error("")}
  }

  public async editSpecialtyData(id, data){
    try {return await this.http.put(`${this.urlBase}/specialties/${id}`, data).toPromise();} catch(e) {throw Error("")}
  }

  public async addSpecialtyData(data){
    try {return await this.http.post(`${this.urlBase}/specialties/`, data).toPromise();} catch(e) {throw Error("")}
  }
}
