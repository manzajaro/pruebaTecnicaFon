import { Component, OnInit } from '@angular/core';
import {ModalController, NavParams, ToastController} from "@ionic/angular";
import {UsersService} from "../../service/users/users.service";
import {User} from "../../service/users/users.service";
import {SpecialtiesService} from "../../service/specialties/specialties.service";
import {Specialties} from "../../service/specialties/specialties.service";
import {CameraService} from "../../service/camera/camera.service";

@Component({
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
})
export class EditPage{
  private userData: User;
  private specialtyData: Specialties;
  private isCorrect = false;

  constructor(private navParams: NavParams, private usersService: UsersService, private modalController: ModalController,
              private specialtiesService : SpecialtiesService,  private toastController: ToastController,
              private cameraService: CameraService) {
      const type = this.navParams.get('type');
      this.setScreenStatus(type);
  }

  private setScreenStatus(type){
      switch(type) {
          case 1:
              const idUser = this.navParams.get('idUser');
              this.userData = <User> JSON.parse(JSON.stringify(this.usersService.getUserByID(idUser)));
              this.presentToast("Click en la imagen para editar");
              this.isCorrect = true;
              break;
          case 2:
              const idSpecialty = this.navParams.get('idSpecialty');
              this.specialtyData = <Specialties> JSON.parse(JSON.stringify(this.specialtiesService.getSpecialtyByID(idSpecialty)));
              this.isCorrect = true;
              break;
          case 3:
              this.userData = <User> {
                  name: null,
                  surname: null,
                  age: null,
                  email: null,
                  avatar: "https://picsum.photos/100",
                  type: "developer"
              };
              break;
          case 4:
              this.specialtyData = <Specialties> {
                  name: null,
              };
              break;
      }
  }

  saveUser(){
    this.modalController.dismiss(this.userData);
  }

  saveSpecialty(){
    this.modalController.dismiss(this.specialtyData);
  }

  textCheck(){
    if(this.userData.name && this.userData.name != "" && this.userData.surname && this.userData.surname != ""
        && this.userData.email && this.userData.email != "" && this.userData.age) this.isCorrect = true;
    else this.isCorrect = false;
  }

  async editPhoto(){
    const url = await this.cameraService.getCameraPicture();
    this.userData.avatar =  'data:image/jpeg;base64,' + url;
  }

  textCheckSpecialty(){
      if(this.specialtyData.name && this.specialtyData.name != "") this.isCorrect = true;
      else this.isCorrect = false;
  }

  async presentToast(text) {
    const toast = await this.toastController.create({message: text, duration: 2000});
    toast.present();
  }
  updateUrl(event) {
      event.srcElement.src = "https://picsum.photos/100";
  }

  cancel(){
    this.modalController.dismiss();
  }
}
