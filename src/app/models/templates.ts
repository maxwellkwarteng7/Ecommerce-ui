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
