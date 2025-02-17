import { Product } from "./productTemplate"

export interface registerTemplate {
    username: string, 
    password: string, 
    email: string, 
}

export interface loginTemplate {
    email: string, 
    password : string   
}

export interface registrationSuccessMessage {
    message : string 
}

export interface loginSuccessMessage {
   message : {
    username: string, 
    token: string, 
    userRole: string, 
    userEmail : string 
   }
}

export interface userDetails  {
    username: string, 
    userRole: string, 
    userEmail : string 
}

export interface Cart extends Product{
    quantity : number 
}
