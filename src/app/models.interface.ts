export interface User {
    id: number;
    username: string;
    password: string;
    role: number;
    user_jira: Jira ;
  }
export interface Jira {
    id: number;
    username: string;
    password: string;
    component: string;
    proyect: string;
    url: string;
}
  