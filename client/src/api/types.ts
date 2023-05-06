export type Login = {
 email: string;
 password: string;
};

export type ResetPassword = {
 password: string;
 resetToken: string;
 userId: string;
};

export type VerifyAccount = {
 token: string;
 email: string;
};

export type Address = {
 address: string;
 city: string;
 zipCode: string;
 country: string;
 additionalInfo?: string;
 _id: string;
};

export type CartItem = {
 _id: string;
 title: string;
 author: string;
 price: number;
 image: string;
 qty: number;
};

export type Cart = {
 cart: {
  items: CartItem[];
  totalQty: number;
  totalPrice: number;
 };
};

export type UserNames = {
 firstName: string;
 lastName: string;
};

export type UserAddress = {
 _id?: string;
 userInfo: UserNames;
 addresses: Address[];
};

export type ItemId = {
 itemId: string;
};

export type Book = {
 author: string;
 image: string;
 price: string;
 title: string;
 _id: string;
};

export type Details = {
 [key: string]: string;
};

export type ProductDetails = {
 _id: string;
 description: string;
 details: Details;
 basicInfo: Book;
};
