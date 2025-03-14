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

export interface Cart {
    id: number, 
    name: string, 
    image: string, 
    price: number, 
    discountPrice : number , 
    stock: number, 
    quantity: number, 
    isAuthenticated: boolean;
}

export interface Address {
    fullName: string, 
    phone: string, 
    address1: string, 
    address2: string, 
    country: string, 
    state: string, 
    city: string, 
    id: number
}

export interface Orders {
    id: number
    userId: number
    totalPrice: number
    paymentMethod: string
    transactionRef: string
    addressId: number
    paymentDate: string
    order_shipping_address: OrderShippingAddress
  }
  
  export interface OrderShippingAddress {
    fullName: string
    phone: string
    address1: string
    address2: any
    country: string
    city: string
    state: string
  }
  
