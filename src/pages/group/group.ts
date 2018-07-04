import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {GroupProvider} from "../../providers/group/group";
import {CodeQrProvider} from "../../providers/code-qr/code-qr";
import {UserGroupProvider} from "../../providers/user-group/user-group"
import {UserProvider} from "../../providers/user/user";
import { Storage } from '@ionic/storage';
import {User} from "../../models/User";
import {Group} from "../../models/Group";
import { AlertController } from 'ionic-angular';
import {DomSanitizer, SafeUrl} from '@angular/platform-browser';
import { CodeQR } from '../../models/CodeQR';
import { UserGroup } from '../../models/UserGroup';

@Component({
  selector: 'page-group',
  templateUrl: 'group.html',
})
export class GroupPage {

  currentUser: User;
  groupSelected: Group;
  lstGroups:Array<Group>;
  mode: number = 0;
  groupForm: FormGroup;
  isUserOwner: boolean;
  messageSuccess: string = "";
  messageError: string = "";
  displayImage: SafeUrl = "";
  hideShowCodeQR: boolean;

  constructor(public modalCtrl: ModalController, public domSanitizer: DomSanitizer, public userGroupProvider: UserGroupProvider, public alertCtrl: AlertController, public storage: Storage, public formBuilder : FormBuilder, public navCtrl: NavController, public navParams: NavParams, public groupProvider: GroupProvider, public userProvider: UserProvider, public codeProvider: CodeQrProvider) 
  {
    this.currentUser = this.navParams.get('currentUser');
  }

  showGroups(mode)
  {
    this.messageSuccess = "";
    this.messageError = "";
    this.mode = mode;
    if(mode == 1)
    {
      this.groupProvider.GetAllGroupByIdUseOwner(this.currentUser.Id).then(data => {
        this.lstGroups = data as Array<Group>;
      })
      .catch(error => { console.log(error); });
    }
    else if(mode == 2)
    {
      this.groupProvider.GetAllGroupByIdUser(this.currentUser.Id).then(data => {
        this.lstGroups = data as Array<Group>;
      })
      .catch(error => { console.log(error); });
    }
  }

  selectGroup(group : Group)
  {
    this.mode = 3;
    this.groupSelected = group;

    if(this.groupSelected.IdCodeQR > 0)
    {
      this.hideShowCodeQR = true;
      this.displayImage = this.getSafeUrl(this.groupSelected.CodeQR.CodeQR_Base64);
    }
    else
    {
      this.hideShowCodeQR = false;
    }

    if(group.IdUserOwner == this.currentUser.Id)
    {
      this.isUserOwner = true;
    }
    else
    {
      this.isUserOwner = false;
    }

    this.groupForm = this.formBuilder.group({
      Name: [this.groupSelected.Name, Validators.compose([Validators.required])],
      Description: [this.groupSelected.Description, Validators.compose([Validators.required])], 
      Proprietaire: [this.currentUser.FirstName + ' ' + this.currentUser.LastName]
    });
  }

  updateGroup(group: Group)
  {
    group.IdUserOwner = this.groupSelected.IdUserOwner;
    group.Id = this.groupSelected.Id;

    if(this.groupForm.valid) 
    {
      if(group.Id != undefined)
      {
        this.groupProvider.Update_Group(group).then(data => {
          this.messageSuccess = data as string;
        })
        .catch(error => { this.messageError = error; });
      }
      else 
      {
        this.groupProvider.Create_Group(group).then(data => {
          this.messageSuccess = data as string;
        })
        .catch(error => { this.messageError = error; });
      }
    }

    this.showGroups(0);
  }

  addNewGroup()
  {
    this.groupSelected = new Group();
    this.groupSelected.IdUserOwner = this.currentUser.Id;
    this.selectGroup(this.groupSelected);
  }

  showUsers() {
    this.userProvider.GetAllUser().then((data : Array<User>)=> {

      this.groupProvider.GetGroupById(this.groupSelected.Id).then((group: Group) => {
      
        let alert = this.alertCtrl.create();
        alert.setTitle("Membres du groupes");
        var isOwner = this.isUserOwner;

        data.forEach(function(user: User)
        { 
          if(group.LstUser.find(x => x.IdUser === user.Id) != undefined)
          {
            alert.addInput({
              type: "checkbox",
              label: user.FirstName + " " + user.LastName,
              value: user.Id.toString(),
              checked:true,
              disabled: group.IdUserOwner == user.Id || !isOwner ? true : false
            });
          }
          else
          {
            alert.addInput({
              type: "checkbox",
              label: user.FirstName + " " + user.LastName,
              value: user.Id.toString(),
              checked:false,
              disabled: !isOwner ? true : false
            });
          }
        });

        alert.addButton('Annuler');
        alert.addButton({
          text: 'Valider',
          handler: data => {
            var lstUserGroup = new Array();

            data.forEach(function(element)
            {
              var userGroup = {IdGroup: group.Id, IdUser: element};
              lstUserGroup.push(userGroup);
            });

            this.userGroupProvider.AddUserToGroup(lstUserGroup);
          }
        });
        alert.present();

      })
      .catch(error => { console.log(error); });

    })
    .catch(error => { console.log(error); });
  }

  showCodeQR()
  {
    this.codeProvider.GetAllCodeQRByIdUserCreator(this.currentUser.Id).then((data: Array<CodeQR>) => {

        let alert = this.alertCtrl.create();
        alert.setTitle("Choisir un Qr code");

        var idCodeQR = 0;
        if(this.groupSelected.IdCodeQR > 0)
        {
          idCodeQR = this.groupSelected.IdCodeQR;
        }
         
        data.forEach(function(element)
        {
          if(idCodeQR > 0)
          {
            alert.addInput({
              type: "radio",
              label: element.Name,
              value: element.Id.toString(),
              checked: idCodeQR == element.Id? true : false
            });
          }
          else
          {
            alert.addInput({
              type: "radio",
              label: element.Name,
              value: element.Id.toString()
            });
          }
        });

        alert.addButton('Annuler');
        alert.addButton({
          text: 'Valider',
          handler: (data: number) => {
            this.codeProvider.AddCodeQRToGroup(this.groupSelected.Id, data).then(data => {
              this.groupProvider.GetGroupById(this.groupSelected.Id).then((group: Group) => {
                this.groupSelected.IdCodeQR = group.IdCodeQR;
                this.groupSelected.CodeQR = group.CodeQR;
                this.hideShowCodeQR = true;
                this.displayImage = this.getSafeUrl(this.groupSelected.CodeQR.CodeQR_Base64);
              })
              .catch(error => { console.log(error); });
            })
            .catch(error => { console.log(error); });
          }
        });
        alert.present();
    })
    .catch(error => { console.log(error); });
  }

  getSafeUrl(value: string)
  {
    return this.domSanitizer.bypassSecurityTrustUrl("data:Image/*;base64," + value);
  }

  deleteGroup(group: Group)
  {
    let alert = this.alertCtrl.create({
      title: 'Confirmation',
      message: "Continuer la suppression du groupe '" + group.Name + "' ?",
      buttons: [
        {
          text: 'Annuler'        
        },
        {
          text: 'Valider',
          handler: () => {
            this.groupProvider.DeleteGroupById(group.Id).then(data => {
              this.showGroups(0);
            })
            .catch(error => { console.log(error); });
          }
        }
      ]
    });
    alert.present();
  }
}


