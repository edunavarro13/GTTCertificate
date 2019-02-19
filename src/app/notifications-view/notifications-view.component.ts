import {
  Component,
  OnInit
} from '@angular/core';
import {
  GttApiService
} from '../gtt-api.service';
import {
  NotificationsService
} from 'angular2-notifications';
import {
  Certificate,
  User,
  Jira
} from '../models.interface';
import {
  Router
} from '@angular/router';
import { GttJiraService } from '../gtt-jira.service';
import { Base64 } from 'js-base64';
import { AuxiliarsService } from '../auxiliars.service';

@Component({
  selector: 'app-notifications-view',
  templateUrl: './notifications-view.component.html',
  styleUrls: ['./notifications-view.component.scss']
})
export class NotificationsViewComponent implements OnInit {

  id: number;
  allCertificates: Array < Certificate > = [];
  userActive: User;

  // Input de la campana del header
  contadorPadre: number = 0;

  constructor(private gttApi: GttApiService, private jiraApi: GttJiraService, private auxiliarService: AuxiliarsService,
    private notification: NotificationsService, private router: Router) {}

  ngOnInit() {
    
    this.loadGrid();
    this.gttApi.getUserById().then((responseUser: User) => {
      this.userActive = responseUser;
    }).catch(res => {
      if (res.status === 401) {
        this.router.navigate(['/login']);
      } else if (res.status === 504) {
        console.error(res);
        this.notification.error('¡ERROR!', 'No se ha podido conectar al servidor. Vuelve a intentarlo más tarde.', this.auxiliarService.getNotificationError());
      } else {
        console.error(res);
      }
    });
  }

  loadGrid() {
    this.gttApi.getAllCertificates().then((result: any) => {
      // Guarda los que no se hayan marcado como eliminados
      this.allCertificates = result.filter(val => !val.eliminado && (val.estado === 1 || val.estado === 2));
    }).catch(res => {
      // Si entra aqui es que no esta autorizado
      if (res.status === 401) {
        this.router.navigate(['/login']);
      } else {
        console.error(res);
      }
    });
  }

  deleteButton(cert: Certificate) {
    if (this.userActive.role === 0) {
      cert.eliminado = true;
      this.gttApi.updateCertificate(cert).then(result2 => {
        this.notification.success('¡Éxito!', `El certificado ${cert.alias} se ha marcado como eliminado exitosamente.`, this.auxiliarService.getNotificationError());
        this.contadorPadre += 1;
        this.loadGrid();
      }).catch(res => {
        if (res.status === 401) {
          this.router.navigate(['/login']);
        } else {
          console.error(res);
        }
      });
    } else {
      this.notification.error('¡ERROR!', "No tienes la autorización necesaria para marcar como eliminados los certificados.", this.auxiliarService.getNotificationError());
    }
  }

  addToJira(cert: Certificate) {
      // Primero comprobamos que haya un usuario Jira enlazado con el usuario
      this.gttApi.getJiraByUserId().then((responseJira: Jira) => {
        // Comprobamos que el usuario y la contraseña de Jira existan
        this.jiraApi.verifiedUser(responseJira.username, responseJira.password).then((responseTok: any) => {
          // Codificamos el username y el password ya que no funciona pasando el token
          let objJsonB64 = Base64.encode(responseJira.username+":"+responseJira.password);
          // Subimos la tarea a Jira
          this.jiraApi.postJiraTask(objJsonB64, responseJira.proyect, `${cert.alias} caducará pronto (fecha: ${cert.caducidad})`, 
          "descripcion", "Explotacion").then( res3 => {
            // Modificamos su estado a subido
            cert.estado = 3;
            this.gttApi.updateCertificate(cert).then(resFinal => {
              this.notification.success('¡Éxito!', `La tarea del certificado ${cert.alias} ha sido subido a Jira con éxito.`, this.auxiliarService.getNotificationError());
              this.contadorPadre += 1;
              this.loadGrid();
            }).catch(console.error);
          }).catch(console.error);
        }).catch(errmes => this.notification.error('¡ERROR!', `El usuario de Jira ${responseJira.username} no se ha podido conectar.`, this.auxiliarService.getNotificationError()));
      }).catch((res2: any) => {
        if(res2.status === 401) {
          this.router.navigate(['/login']);
        } else {
          this.notification.error('¡ERROR!', "No tienes un usuario Jira enlazado con el que subirlo. Ve a Datos usuario y agrégalo para hacerlo.", this.auxiliarService.getNotificationError());
        }
      });
  }

}
