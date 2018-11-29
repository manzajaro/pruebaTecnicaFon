import {Component, OnInit} from '@angular/core';
import { UsersService } from "../../service/users/users.service";
import { EnumUsers } from "../../service/users/users.service";
import { TeamsService } from "../../service/teams/teams.service";
import {ItemSliding, ModalController, ToastController} from "@ionic/angular";
import {EditPage} from "../edit/edit.page";
import {SpecialtiesService} from "../../service/specialties/specialties.service";
import {EnumSpecialties} from "../../service/specialties/specialties.service";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{

    constructor(private userService: UsersService, private toastController: ToastController, private teamsService: TeamsService,
                public modalController: ModalController, private specialtiesService: SpecialtiesService) {}

    private Users: EnumUsers;
    private Specialties: EnumSpecialties;

    ngOnInit(){
        this.teamsService.initTeams()
            .then(() => {this.getUsers().then(() => this.getSpecialties()
                .then(()=>this.presentToast('Desliza para borrar o editar un usuario'))
                .catch(() => this.presentToast("Se ha producido un error en el servidor"))
            )})
            .catch(() => this.presentToast("Se ha producido un error en el servidor"));
    }

    async ionViewWillEnter() {
        if(this.userService.getRefreshUsers()) this.Users = await this.userService.getAllUsers();
    }

    async getUsers(){
        this.Users = await this.userService.getAllUsers();
    }

    async getSpecialties(){
        this.Specialties = await this.specialtiesService.getAllSpecialties();
    }

    async presentToast(text) {
        const toast = await this.toastController.create({message: text, duration: 2000});
        toast.present();
    }

    async editItemUser(slidingItem: ItemSliding, user){
        slidingItem.close();
        const modal = await this.modalController.create({component: EditPage, componentProps: { type: 1, idUser: user.id }});
        modal.onDidDismiss().then(data => this.editUser(data.data));
        return await modal.present();
    }

    async editItemSpecialty(slidingItem: ItemSliding, user){
        slidingItem.close();
        const modal = await this.modalController.create({component: EditPage, componentProps: { type: 2, idSpecialty: user.id }});
        modal.onDidDismiss().then(data => this.editSpecialty(data.data));
        return await modal.present();
    }

    async addNewUser(){
        const modal = await this.modalController.create({component: EditPage, componentProps: { type: 3 }});
        modal.onDidDismiss().then(data => this.addUser(data.data));
        return await modal.present();
    }

    async addNewSpecialty(){
        const modal = await this.modalController.create({component: EditPage, componentProps: { type: 4 }});
        modal.onDidDismiss().then(data => this.addSpecialty(data.data));
        return await modal.present();
    }

    deleteUser(slidingItem: ItemSliding, user) {
        this.userService.deleteUserByID(user.id)
            .then(()=> this.presentToast("Usuario borrado correctamente").then(() => this.getUsers()))
    }

    editUser(data){
        if(data){
            this.userService.editUserData(data.id, data)
                .then(() => {this.getUsers().then(() => this.presentToast('Usuario editado correctamente'))})
                .catch(() => this.presentToast("Se ha producido un error al editar el usuario"));
        }
    }

    addUser(data){
        if(data){
            this.userService.addUserData(data)
                .then(() => {this.getUsers().then(() => this.presentToast('Usuario creado correctamente'))})
                .catch(() => this.presentToast("Se ha producido un error al crear el usuario"));
        }
    }

    addSpecialty(data){
        if(data){
            this.specialtiesService.addSpecialtyData(data)
                .then(() => {this.getSpecialties().then(() => this.presentToast('Especialidad creada correctamente'))})
                .catch(() => this.presentToast("Se ha producido un error al crear la especialidad"));
        }
    }

    editSpecialty(data){
        if(data){
            this.specialtiesService.editSpecialtyData(data.id, data)
                .then(() => {this.getSpecialties().then(() => this.presentToast('Especialidad editada correctamente'))})
                .catch(() => this.presentToast("Se ha producido un error al editar la especialidad"));
        }
    }

    deleteSpecialty(slidingItem: ItemSliding, specialty) {
        this.specialtiesService.deleteSpecialtyByID(specialty.id)
            .then(()=> this.presentToast("Especialidad borrada correctamente").then(() => this.getSpecialties()))
    }

    updateUrl(event) {
        event.srcElement.src = "https://picsum.photos/100";
    }
}
