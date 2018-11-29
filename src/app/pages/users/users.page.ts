import {Component, ErrorHandler, NgZone, OnInit} from '@angular/core';
import { UsersService } from "../../service/users/users.service";
import {ActivatedRoute, Router} from '@angular/router';
import { User } from "../../service/users/users.service";
import { EnumUsers } from "../../service/users/users.service";
import {EnumSpecialties} from "../../service/specialties/specialties.service";
import { SpecialtiesService } from "../../service/specialties/specialties.service";
import {AlertController, ItemSliding, ToastController} from "@ionic/angular";

@Component({
    selector: 'app-users',
    templateUrl: './users.page.html',
    styleUrls: ['./users.page.scss'],
})

export class UsersPage implements OnInit, ErrorHandler{

    constructor(private usersService: UsersService, private route: ActivatedRoute, private toastController: ToastController,
                private specialtiesService: SpecialtiesService, private alertController: AlertController, private zone: NgZone,
                private router: Router) {}

    private dataUser: any = {};
    private specialties = [];
    private developersUsers = [];

    handleError(error: any): void {
        this.router.navigateByUrl('/home');
    }

    async ngOnInit() {
        let idUser = this.route.snapshot.paramMap.get('id');
        await this.presentToast('Desliza para borrar');
        this.dataUser = <User> this.usersService.getUserByID(idUser) || {};
        if(!Object.keys(this.dataUser).length) return await this.router.navigateByUrl('/home');
        this.getListSpecialties().then(() => this.getListDeveloper());
    }

    async getListSpecialties(){
        this.specialties = <EnumSpecialties> await this.specialtiesService.getSpecialtiesByUserID(this.dataUser.id);
    }

    async getListDeveloper(){
        if(this.dataUser.teamLeaderOf){
            setTimeout(async ()=>{this.developersUsers = <EnumUsers> await this.usersService.getDevelopersByTeamLeaderID(this.dataUser.id);},100);
        }
    }

    async addDeveloperToTeam(){
        const alert = await this.alertController.create({
            header: 'Add to team',
            inputs: this.usersService.getUsersNoTeam(),
            buttons: [
                {text: 'Cancel', role: 'cancel', cssClass: 'secondary'},
                {
                    text: 'Ok',
                    handler: (data) => this.addDeveloperToTeamFinish(data)
                }
            ]
        });
        await alert.present();
    }

    async addSpecialtyToDeveloper(){
        const alert = await this.alertController.create({
            header: 'Add Specialty',
            inputs: this.specialtiesService.getSpecialtiesToAddUser(this.specialties),
            buttons: [
                {text: 'Cancel', role: 'cancel', cssClass: 'secondary'},
                {
                    text: 'Ok',
                    handler: (data) => this.addSpecialtyToDeveloperFinish(data)
                }
            ]
        });
        await alert.present();
    }

    addDeveloperToTeamFinish(data){
        this.usersService.addDevelopersByTeamLeaderID(this.dataUser.id, data)
            .then(()=> this.presentToast("Developer añadido correctamente").then(() => {
                this.zone.run(async ()=>{
                    this.usersService.setUserNotAvailable(data);
                    await this.getListDeveloper();
                });
            }))
            .catch(() => this.presentToast("Se ha producido un error al añadir el developer."));
    }

    addSpecialtyToDeveloperFinish(data){
        this.specialtiesService.addSpecialtiesByUserID(this.dataUser.id, data)
            .then(()=> this.presentToast("Especialidad añadida correctamente").then(() => {
                this.zone.run(async ()=>{
                    await this.getListSpecialties();
                });
            }))
            .catch(() => this.presentToast("Se ha producido un error al añadir la especialidad."));
    }

    deleteItem(slidingItem: ItemSliding, developer) {
        slidingItem.close();
        this.usersService.deleteDevelopersByTeamLeaderID(this.dataUser.id, developer.id)
            .then(()=> this.presentToast("Developer borrado correctamente").then(async () => {
                this.usersService.setUserAvailable(developer);
                await this.getListDeveloper();
            }))
            .catch(() => this.presentToast("Se ha producido un error al borrar el developer."));
    }

    deleteSpecialty(slidingItem: ItemSliding, specialty) {
        slidingItem.close();
        this.specialtiesService.deleteSpecialtiesByUserID(this.dataUser.id, specialty.id)
            .then(()=> this.presentToast("Especialidad borrada correctamente").then(() => this.getListSpecialties()))
            .catch(() => this.presentToast("Se ha producido un error al borrar la especialidad."));
    }

    async presentToast(text) {
        const toast = await this.toastController.create({message: text, duration: 2000});
        toast.present();
    }

    updateUrl(event) {
        event.srcElement.src = "https://picsum.photos/100";
    }
}

