
export interface Category {
    id : number ,
    name: string,
    image : string
}

export interface productsTemplate {
  currentPage: number, 
  totalPages: number, 
  products : Product[]
}


export interface Product {
  id : number ,
  name : string ,
  image : string ,
  price : number ,
  discountPrice : number ,
  categoryId : number ,
  tagId : number ,
  stock : number ,
  description : string
}

export interface reviews {
  id : number , 
  rating: number, 
  comment: string, 
  userId: number, 
  productId: number
  updatedAt: Date, 
  User: {
    username : string
  }
}
export interface reviewsTemplate {
  totalReviews: number,
  currentPage: number,
  totalPages: number,
  reviews :  reviews[] 
}
