export type Login = {
 email: string;
 password: string;
};

export type Address = {
 address: string;
 city: string;
 zipCode: string;
 country: string;
 additionalInfo?: string;
 _id: string;
};

export type UserNames = {
 firstName: string;
 lastName: string;
};

export type UserAddress = {
 userInfo: UserNames;
 addresses: Address[];
};

export type Book = {
 author: string;
 image: string;
 price: string;
 title: string;
 _id: string;
};
type Details = {
 format: string;
 dimensions: string;
 language: string;
 publicationDate: string;
 ISBN10: string;
 ISBN13: string;
};

export type ProductDetails = {
 _id: string;
 description: string;
 details: Details;
 basicInfo: Book;
};
