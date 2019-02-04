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
  idUser: number;
}
export interface Certificate {
  id: number;
  alias: string;
  entidad_emisora: string;
  serie: string;
  subject: string;
  caducidad: string;
  password: string;
  id_orga: number;
  cliente: string;
  itegraciones_institucion: string;
  persona_contacto: string;
  reporsitorio: string;
  observaciones: string;
  eliminado: boolean;
}
