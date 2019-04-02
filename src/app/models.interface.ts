export interface User {
  id: number;
  username: string;
  password: string;
  role: number;
}
export interface Jira {
  id: number;
  username: string;
  password: string;
  component: string;
  proyect: string;
  url: string;
  descripcion: string;
  issue: number;
  idUser: number;
}
export interface Certificate {
  id: number;
  alias: string;
  entidad_emisora: string;
  serie: string;
  subject: string;
  caducidad: Date;
  password: string;
  id_orga: number;
  cliente: string;
  itegraciones_institucion: string;
  persona_contacto: string;
  repositorio: string;
  observaciones: string;
  eliminado: boolean;
  fichero64: string;
  nombreArchivo: string;
  estado: number;
}
