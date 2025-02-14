
export interface Category {
    id : number ,
    name: string,
    image : string
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
