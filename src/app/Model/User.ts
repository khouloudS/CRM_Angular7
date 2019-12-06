
export class postUserModel{
  ID :number;
  Adresse :string;
  CIN:number;
  DateBirth:string;
  Email:string;
  Nom: string;
  Password: string;
  Prenom: string;
  Username: string;
  Operateur: string;
}

export interface respUserModel {

  ID :number;
  Adresse :string;
  CIN:number;
  DateBirth:string;
  Email:string;
  Nom: string;
  Password: string;
  Prenom: string;
  Username: string;
  Operateur: string;
}
export interface login {
  Email: string;
  Password: string;

}
