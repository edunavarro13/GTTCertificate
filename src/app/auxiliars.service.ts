import {
  Injectable
} from '@angular/core';
import {
  HttpClient
} from '@angular/common/http';
import {
  Router
} from '@angular/router';
import {
  Certificate
} from './models.interface';
import {
  NotificationsService
} from 'angular2-notifications';

@Injectable({
  providedIn: 'root'
})
export class AuxiliarsService {

  notificationError = {
    timeOut: 3000,
    showProgressBar: true,
    pauseOnHover: true,
    clickToClose: true
  };
  notificationInfo = {
    timeOut: 5000,
    showProgressBar: true,
    pauseOnHover: true,
    clickToClose: true
  };

  constructor(private api: HttpClient, private router: Router) {}

  getNotificationError() {
    return this.notificationError;
  }

  downloadFile(certificate: Certificate) {
    let certificateType = certificate.nombreArchivo.split('.')[1];
    var contentType = "file/" + certificateType;
    var byteCharacters = atob(certificate.fichero64);
    var byteNumbers = new Array(byteCharacters.length);

    for (var i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    var byteArray = new Uint8Array(byteNumbers);
    var blob = new Blob([byteArray], {
      type: contentType
    });
    var aux_document = document.createElement("a");
    aux_document.href = URL.createObjectURL(blob);
    aux_document.download = `${certificate.nombreArchivo}`;
    document.body.appendChild(aux_document);
    aux_document.click();
  }

  infoButton(option: number, notification: NotificationsService) {
    // ------ Opciones Login ---------
    if (option === 1) {
      notification.info('Información', `En Usuario debes introducir el nombre de usuario con el que te has registrado.`, this.notificationInfo);
    } else if (option === 2) {
      notification.info('Información', `En Contraseña debes introducir la contraseña que elegiste al registrar tu usuario.`, this.notificationInfo);
    }
    // ---- Opciones Agregar Certificado ---------------
    else if (option === 3) {
      notification.info('Información', `En Alias debes definir el sobrenombre que quieres darle al certificado.`, this.notificationInfo);
    } else if (option === 4) {
      notification.info('Información', `En ID_ORGA debes poner el identificador del organismo que lo utiliza.`, this.notificationInfo);
    } else if (option === 5) {
      notification.info('Información', `En Lista de integraciones debes definir las integraciones con la institución donde se utiliza el certificado.`, this.notificationInfo);
    } else if (option === 6) {
      notification.info('Información', `En Persona para renovaciones debes poner el email de la persona de contacto para renovaciones del certificado.`, this.notificationInfo);
    } else if (option === 7) {
      notification.info('Información', `En Repositorio debes introducir un texto descriptivo de donde está ubicado el certificado para su uso.`, this.notificationInfo);
    } else if (option === 8) {
      notification.info('Información', `En Cliente debes definir el nombre del cliente que utiliza el certificado`, this.notificationInfo);
    } else if (option === 9) {
      notification.info('Información', `En Observaciones puedes hacer anotaciones al certificado.`, this.notificationInfo);
    } else if (option === 10) {
      notification.info('Información', `En Contraseña debes introducir la contraseña del certificado que quieres subir.`, this.notificationInfo);
    } else if (option === 11) {
      notification.info('Información', `Para poder agregar un certificado primero debes rellenar todos los campos y, luego, pulsar en el botón Examinar que aparecerá y elegir el certificado deseado.`, this.notificationInfo);
    }
    // ------------- Opciones Registrar --------------
    else if (option === 12) {
      notification.info('Información', `En Usuario debes introducir el nombre de usuario con el que te quieres registrar.`, this.notificationInfo);
    } else if (option === 13) {
      notification.info('Información', `En Contraseña debes introducir la contraseña con la que quieres registrar tu usuario.`, this.notificationInfo);
    } else if (option === 14) {
      notification.info('Información', `En Confirmación contraseña debes introducir la misma contraseña que pusiste en Contraseña.`, this.notificationInfo);
    } else if (option === 15) {
      notification.info('Información', `En Rol de usuario debes elegir si quieres que el usuario tenga permisos de edición de certificados (Admin) o solo de lectura (User).`, this.notificationInfo);
    }
    // ------ Opciones Datos usuario ---------------
    if (option === 16) {
      notification.info('Información', `En Usuario de Jira debes introducir el nombre de usuario que usas en Jira.`, this.notificationInfo);
    } else if (option === 17) {
      notification.info('Información', `En Contraseña de Jira debes introducir la contraseña que elegiste en Jira.`, this.notificationInfo);
    } else if (option === 18) {
      notification.info('Información', `En Componente de Jira debes introducir el equipo que va a recibir la tarea de Jira.`, this.notificationInfo);
    } else if (option === 19) {
      notification.info('Información', `En Proyecto de Jira debes introducir el proyecto donde se creará una tarea cuando un certificado caduque.`, this.notificationInfo);
    } else if (option === 20) {
      notification.info('Información', `En Url de Jira debes introducir la url de tu usuario de Jira.`, this.notificationInfo);
    } else if (option === 21) {
      notification.info('Información', `Este icono verifica que el usuario de Jira introducido existe.`, this.notificationInfo);
    } else if (option === 22) {
      notification.info('Información', `En contraseña debes introducir la nueva contraseña que quieras tener.`, this.notificationInfo);
    } else if (option === 23) {
      notification.info('Información', `En confirmación de la contraseña debes introducir el mismo valor que en contraseña.`, this.notificationInfo);
    } else if (option === 24) {
      notification.info('Información', `Tipo de tarea es el tipo que tendrá la tarea de Jira cuando se suba (siempre será Explotación).`, this.notificationInfo);
    } else if (option === 25) {
      notification.info('Información', `En descripción de Jira debes introducir la información en detalle que tendrá la tarea de Jira cuando se suba.`, this.notificationInfo);
    }
  }
}
